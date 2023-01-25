import type { ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { Navbar } from "@/components/navbar";
import {useUser, useUserData} from "@/hooks/user";
import {useQueryClient} from "@tanstack/react-query";
import {User} from "@/types";
import ReturnReminder from "@/components/layout/reminder";

export type LayoutMainProps = {
  children?: ReactNode;
  title?: string;
  withoutMain?: boolean;
};

export const LayoutMain = ({
  children,
  title = "Title",
  withoutMain = false,
}: LayoutMainProps) => {
  const { asPath } = useRouter();
  const { data: user } = useUser();
  const links = [
    {
      active: asPath === "/",
      href: "/",
      text: "Strona główna",
    },
    {
      active: asPath.startsWith("/rental"),
      href: "/rental",
      text: "Wypożyczalnia",
    },
    {
      active: asPath.startsWith("/contact"),
      href: "/contact",
      text: "Kontakt",
    },
  ]
  const menu = user ? user.is_staff : false;

  if (user?.is_staff)
    links.push({
        active: asPath.startsWith("/admin"),
        href: "/admin",
        text: "Panel administratora",
    });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ReturnReminder />
      <Navbar
        links={links}
        isMenu={menu}
      />
      {withoutMain ? (
        children
      ) : (
        <main className="mt-16 flex flex-grow flex-col">{children}</main>
      )}
    </>
  );
};
