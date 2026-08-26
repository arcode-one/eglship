"use client";

import { useEffect } from "react";

const MEDIA_SELECTOR = "img, svg, picture";

function isMediaTarget(target: EventTarget | null) {
  return target instanceof Element && target.closest(MEDIA_SELECTOR) !== null;
}

export default function MediaInteractionGuard() {
  useEffect(() => {
    const preventMediaContextMenu = (event: MouseEvent) => {
      if (isMediaTarget(event.target)) {
        event.preventDefault();
      }
    };

    const preventMediaDrag = (event: DragEvent) => {
      if (isMediaTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventMediaContextMenu, true);
    document.addEventListener("dragstart", preventMediaDrag, true);

    return () => {
      document.removeEventListener("contextmenu", preventMediaContextMenu, true);
      document.removeEventListener("dragstart", preventMediaDrag, true);
    };
  }, []);

  return null;
}
