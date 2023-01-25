import type { ReactNode } from "react";

import Link, { type LinkProps } from "next/link";

import { clsx } from "clsx";

export type NavbarButtonProps = {
  active?: boolean;
  children?: ReactNode;
  href: LinkProps["href"];
};

export const NavbarButtonDesktop = ({
  active = false,
  children,
  href,
}: NavbarButtonProps) => (
  <Link
    href={href}
    className={clsx(
      "inline-flex items-center border-b-4 px-1 pt-1 text-sm font-medium",
      active
        ? "border-indigo-500 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    )}
  >
    {children}
  </Link>
);
