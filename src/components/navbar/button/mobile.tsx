import type { ReactNode } from "react";

import Link, { type LinkProps } from "next/link";

import { Disclosure } from "@headlessui/react";

import { clsx } from "clsx";

export type NavbarButtonMobileProps = {
  active?: boolean;
  children?: ReactNode;
  href: LinkProps["href"];
};

export const NavbarButtonMobile = ({
  active = false,
  children,
  href,
}: NavbarButtonMobileProps) => (
  <Disclosure.Button
    as={Link}
    className={clsx(
      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
      active
        ? "border-indigo-500 bg-indigo-50 text-gray-900"
        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
    )}
    href={href}
  >
    {children}
  </Disclosure.Button>
);
