"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import ProfileDropdown from "@/features/dashboard/components/ProfileDropdown";
import ProfileEditNameDropdown from "@/features/dashboard/components/ProfileEditNameDropdown";

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
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { user, setUser } = useAuthStore();

  const displayName = user?.username?.trim() || "NAMA AKUN";
  const displayEmail = user?.email?.trim() || "akun123@email.com";

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
              onSave={() => {
                const nextName = editedName.trim();
                if (!nextName || !user) {
                  setPopupMode("menu");
                  return;
                }

                setUser({
                  ...user,
                  username: nextName,
                });
                setPopupMode("menu");
              }}
            />
          )}
        </div>
      ) : null}
    </header>
  );
}
