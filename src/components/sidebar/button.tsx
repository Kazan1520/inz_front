import { ReactNode } from "react";

import Link from "next/link";

import { clsx } from "clsx";

export type SidebarButtonProps = {
  active?: boolean;
  children?: ReactNode;
  href: string;
};

export const SidebarButton = ({
  active = false,
  children,
  href,
}: SidebarButtonProps) => (
  <Link
    className={clsx(
      "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
      active
        ? "bg-indigo-800 text-white"
        : "text-indigo-100 hover:bg-indigo-600"
    )}
    href={href}
  >
    {children}
  </Link>
);
