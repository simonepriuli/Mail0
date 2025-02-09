"use client";

import { useOpenComposeModal } from "@/hooks/use-open-compose-modal";
import { NEW_MAIL_SHORTCUT } from "@/lib/constants";

import React from "react";

export default function KeyboardProvider() {
  const { setIsOpen } = useOpenComposeModal();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // couldnt place this inside the providers since the

      if (event.key === NEW_MAIL_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return null;
}
