import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  isMobile: boolean
) => {
  const sidebarRef = useRef<T>(null);

  useEffect(() => {
    const handleSideBarClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        callback();
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleSideBarClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleSideBarClick);
    };
  }, [callback, isMobile]);

  return sidebarRef;
};
