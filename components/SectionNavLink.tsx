"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

type Props = LinkProps & {
  className?: string;
  children: ReactNode;
  onBeforeNavigate?: () => void;
};

export default function SectionNavLink({
  href,
  className,
  children,
  onBeforeNavigate,
  ...rest
}: Props) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    onBeforeNavigate?.();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    router.push(String(href));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  return (
    <Link
      {...rest}
      href={href}
      scroll={false}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}