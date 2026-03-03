"use client";

import { ArrowLeft, SquarePen } from "lucide-react";

type ProfileDropdownProps = {
  name: string;
  email: string;
  onClose: () => void;
  onEditName: () => void;
  onEditPhoto: () => void;
};

export default function ProfileDropdown({
  name,
  email,
  onClose,
  onEditName,
  onEditPhoto,
}: ProfileDropdownProps) {
  return (
    <div className="w-[430px] border-b-2 border-[#365BD7] bg-[#D9D9D9] p-8 shadow-[0_10px_20px_rgba(0,0,0,0.22)]">
      <button
        type="button"
        onClick={onClose}
        className="mb-6 inline-flex items-center gap-2 text-[34px] font-semibold text-[#365BD7]"
      >
        <ArrowLeft className="h-7 w-7" />
        KEMBALI
      </button>

      <div className="mb-6 flex items-center gap-6">
        <div className="flex h-[88px] w-[88px] items-center justify-center bg-gradient-to-b from-[#4A70E2] to-[#C4CDD9]">
          <div className="h-10 w-10 rounded-full bg-[#AFC0E7]" />
        </div>
        <div>
          <p className="text-[46px] font-semibold leading-none text-black">
            {name}
          </p>
          <p className="text-[38px] leading-tight text-[#4B4B4B]">{email}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onEditName}
        className="mb-3 inline-flex items-center gap-3 text-[38px] text-[#1B4FE0]"
      >
        <SquarePen className="h-7 w-7" />
        Edit nama akun
      </button>

      <button
        type="button"
        onClick={onEditPhoto}
        className="inline-flex items-center gap-3 text-[38px] text-[#1B4FE0]"
      >
        <SquarePen className="h-7 w-7" />
        Edit foto
      </button>
    </div>
  );
}
