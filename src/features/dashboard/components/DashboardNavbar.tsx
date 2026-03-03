"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import ProfileDropdown from "@/features/dashboard/components/ProfileDropdown";
import ProfileEditNameDropdown from "@/features/dashboard/components/ProfileEditNameDropdown";
import { supabase } from "@/lib/supabase";

const navItems = [
  { href: "/dashboard", label: "DASHBOARD" },
  { href: "/blog", label: "BLOG" },
  { href: "/event", label: "EVENT" },
  { href: "/galeri", label: "GALERI" },
];

export default function DashboardNavbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"menu" | "edit-name">("menu");
  const [editedName, setEditedName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { user, setUser } = useAuthStore();

  const displayName = user?.username?.trim() || "NAMA AKUN";
  const displayEmail = user?.email?.trim() || "-";

  useEffect(() => {
    const mapSupabaseUser = (supabaseUser: {
      id: string;
      email?: string | null;
      created_at: string;
      user_metadata?: { username?: unknown };
    }) => ({
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      username:
        typeof supabaseUser.user_metadata?.username === "string"
          ? supabaseUser.user_metadata.username
          : supabaseUser.email || "",
      createdAt: supabaseUser.created_at,
    });

    const syncUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;
      setUser(mapSupabaseUser(data.user));
    };

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) return;
      setUser(mapSupabaseUser(session.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  useEffect(() => {
    if (!isPopupOpen) return;

    const onClickOutside = (event: MouseEvent) => {
      if (!popupRef.current) return;
      if (popupRef.current.contains(event.target as Node)) return;
      setIsPopupOpen(false);
      setPopupMode("menu");
    };

    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [isPopupOpen]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#FCD704]">
      <div className="mx-auto flex h-[56px] w-full max-w-[1600px] items-center justify-between px-4 md:px-8">
        <nav className="flex items-center gap-7 text-[14px] font-normal text-black">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-75">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => {
            setEditedName(displayName);
            setPopupMode("menu");
            setIsPopupOpen((prev) => !prev);
          }}
          className="flex items-center gap-4 text-black"
          aria-label="Open profile popup"
        >
          <span className="text-[14px] uppercase">{displayName}</span>
          <span className="block h-8 w-8 bg-black" />
        </button>
      </div>

      {isPopupOpen ? (
        <div
          ref={popupRef}
          className="absolute right-4 top-[56px] pt-2 md:right-8"
        >
          {popupMode === "menu" ? (
            <ProfileDropdown
              name={displayName}
              email={displayEmail}
              onClose={() => {
                setIsPopupOpen(false);
                setPopupMode("menu");
              }}
              onEditName={() => setPopupMode("edit-name")}
              onEditPhoto={() => null}
            />
          ) : (
            <ProfileEditNameDropdown
              value={editedName}
              onChange={setEditedName}
              onBack={() => setPopupMode("menu")}
              isSaving={isSavingName}
              onSave={async () => {
                const nextName = editedName.trim();
                if (!nextName) {
                  toast.error("Nama tidak boleh kosong.");
                  return;
                }

                setIsSavingName(true);
                const { data, error } = await supabase.auth.updateUser({
                  data: { username: nextName },
                });

                if (error) {
                  toast.error(error.message || "Gagal mengubah nama akun.");
                  setIsSavingName(false);
                  return;
                }

                if (data.user) {
                  setUser({
                    id: data.user.id,
                    email: data.user.email || "",
                    username:
                      typeof data.user.user_metadata?.username === "string"
                        ? data.user.user_metadata.username
                        : data.user.email || "",
                    createdAt: data.user.created_at,
                  });
                } else if (user) {
                  setUser({ ...user, username: nextName });
                }

                toast.success("Nama akun berhasil diubah.");
                setIsSavingName(false);
                setPopupMode("menu");
              }}
            />
          )}
        </div>
      ) : null}
    </header>
  );
}
