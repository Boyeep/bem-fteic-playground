"use client";

import { RotateCcw } from "lucide-react";
import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";

import { cropImageFile } from "@/lib/imageCrop";

type ImageCropModalProps = {
  isOpen: boolean;
  file: File | null;
  aspectRatio: number;
  title: string;
  cropShape?: "rect" | "circle";
  targetWidth: number;
  targetHeight: number;
  onCancel: () => void;
  onConfirm: (file: File) => void | Promise<void>;
};

type Size = {
  width: number;
  height: number;
};

function clampOffset(
  offset: { x: number; y: number },
  zoom: number,
  naturalSize: Size,
  frameSize: Size,
) {
  const baseScale = Math.max(
    frameSize.width / naturalSize.width,
    frameSize.height / naturalSize.height,
  );
  const renderedWidth = naturalSize.width * baseScale * zoom;
  const renderedHeight = naturalSize.height * baseScale * zoom;
  const maxX = Math.max(0, (renderedWidth - frameSize.width) / 2);
  const maxY = Math.max(0, (renderedHeight - frameSize.height) / 2);

  return {
    x: Math.min(maxX, Math.max(-maxX, offset.x)),
    y: Math.min(maxY, Math.max(-maxY, offset.y)),
  };
}

function getMinZoom(naturalSize: Size, frameSize: Size) {
  const containScale = Math.min(
    frameSize.width / naturalSize.width,
    frameSize.height / naturalSize.height,
  );
  const coverScale = Math.max(
    frameSize.width / naturalSize.width,
    frameSize.height / naturalSize.height,
  );

  return coverScale / containScale;
}

export default function ImageCropModal({
  isOpen,
  file,
  aspectRatio,
  title,
  cropShape = "rect",
  targetWidth,
  targetHeight,
  onCancel,
  onConfirm,
}: ImageCropModalProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [previewUrl, setPreviewUrl] = useState("");
  const [naturalSize, setNaturalSize] = useState<Size | null>(null);
  const [frameSize, setFrameSize] = useState<Size | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!file || !isOpen) {
      setPreviewUrl("");
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(nextPreviewUrl);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setNaturalSize(null);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [file, isOpen]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !isOpen) return;

    const updateSize = () => {
      const rect = frame.getBoundingClientRect();
      setFrameSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!naturalSize || !frameSize) return;
    const minimumZoom = getMinZoom(naturalSize, frameSize);
    setZoom((currentZoom) => Math.max(minimumZoom, currentZoom));
    setOffset((currentOffset) =>
      clampOffset(
        currentOffset,
        Math.max(minimumZoom, zoom),
        naturalSize,
        frameSize,
      ),
    );
  }, [zoom, naturalSize, frameSize]);

  const minimumZoom = useMemo(() => {
    if (!naturalSize || !frameSize) return 1;
    return getMinZoom(naturalSize, frameSize);
  }, [naturalSize, frameSize]);

  const imageStyle = useMemo(() => {
    if (!naturalSize || !frameSize) {
      return undefined;
    }

    const baseScale = Math.min(
      frameSize.width / naturalSize.width,
      frameSize.height / naturalSize.height,
    );

    return {
      width: naturalSize.width,
      height: naturalSize.height,
      transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${baseScale * zoom})`,
    };
  }, [naturalSize, frameSize, offset.x, offset.y, zoom]);

  if (!isOpen || !file) return null;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!naturalSize || !frameSize) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;
    if (!naturalSize || !frameSize) return;

    const nextOffset = clampOffset(
      {
        x: dragState.originX + event.clientX - dragState.startX,
        y: dragState.originY + event.clientY - dragState.startY,
      },
      zoom,
      naturalSize,
      frameSize,
    );

    setOffset(nextOffset);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current?.pointerId === event.pointerId) {
      dragStateRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleConfirm = async () => {
    if (!previewUrl || !naturalSize || !frameSize || isSaving) return;

    setIsSaving(true);
    try {
      const croppedFile = await cropImageFile({
        file,
        imageUrl: previewUrl,
        offsetX: offset.x,
        offsetY: offset.y,
        zoom,
        frameWidth: frameSize.width,
        frameHeight: frameSize.height,
        targetWidth,
        targetHeight,
      });
      await onConfirm(croppedFile);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-4 py-6">
      <div className="w-full max-w-4xl border border-black/15 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold uppercase text-black md:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-black/65">
              Geser dan zoom gambar sampai framing-nya pas.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium uppercase text-black/70 transition-colors hover:text-black"
          >
            Tutup
          </button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_240px]">
          <div className="rounded-[24px] bg-[#E5E5E5] p-4">
            <div
              ref={frameRef}
              className={[
                "relative mx-auto w-full max-w-[680px] overflow-hidden bg-[#B9B9B9]",
                cropShape === "circle"
                  ? "aspect-square rounded-full"
                  : "rounded-[28px]",
              ].join(" ")}
              style={
                cropShape === "rect"
                  ? { aspectRatio: `${aspectRatio}` }
                  : undefined
              }
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Crop preview"
                  draggable={false}
                  onLoad={(event) => {
                    const nextNaturalSize = {
                      width: event.currentTarget.naturalWidth,
                      height: event.currentTarget.naturalHeight,
                    };
                    setNaturalSize(nextNaturalSize);
                    if (frameSize) {
                      setZoom(getMinZoom(nextNaturalSize, frameSize));
                    }
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="absolute left-1/2 top-1/2 max-w-none select-none touch-none will-change-transform"
                  style={imageStyle}
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/80 ring-inset" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-black/10 bg-[#F7F7F7] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase text-black">
                  Zoom
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(minimumZoom);
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase text-black/70 transition-colors hover:text-black"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>

              <input
                type="range"
                min={minimumZoom}
                max={Math.max(minimumZoom + 2, 3)}
                step="0.01"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="mt-4 w-full accent-[#2563EB]"
              />

              <p className="mt-3 text-xs text-black/55">
                Tip: drag gambar langsung di preview untuk mengatur posisi.
              </p>
            </div>

            <div className="mt-auto flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 border border-black/20 px-4 py-3 text-sm font-medium uppercase text-black transition-colors hover:bg-black/5"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSaving}
                className="flex-1 bg-[#2563EB] px-4 py-3 text-sm font-medium uppercase text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Menyimpan..." : "Pakai Gambar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
