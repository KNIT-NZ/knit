"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function jumpToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    jumpToTop();

    const raf1 = requestAnimationFrame(() => {
      jumpToTop();

      const raf2 = requestAnimationFrame(() => {
        jumpToTop();
      });

      return () => cancelAnimationFrame(raf2);
    });

    const timeout = window.setTimeout(() => {
      jumpToTop();
    }, 60);

    return () => {
      cancelAnimationFrame(raf1);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}