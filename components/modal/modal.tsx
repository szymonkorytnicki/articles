"use client";

import { modal, overlay } from "./modal.css";
import { useRouter } from "next/navigation";

export function Modal({ children }) {
  const router = useRouter();

  return (
    <div className={overlay}>
      <div className={modal}>
        {children}
        <br />
        <button type="button" onClick={() => router.back()}>
          Close modal
        </button>
      </div>
    </div>
  );
}
