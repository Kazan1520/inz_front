import { useRouter } from "next/router";

import type { Category } from "@/types";

import { LayoutSidebar, type LayoutSidebarProps } from "../sidebar";

export type LayoutRentalProps = Omit<LayoutSidebarProps, "links"> & {
  categories?: Category[];
};

export const LayoutRental = ({
  categories = [],
  children,
  ...props
}: LayoutRentalProps) => {
  const { asPath } = useRouter();

  return (
    <LayoutSidebar
      links={[
        {
          active: asPath === "/rental",
          href: "/rental",
          text: "Wszystko",
        },
        ...categories.map(({ id, name }) => ({
          active: asPath.startsWith(`/rental/${id}`),
          href: `/rental/${id}`,
          text: name,
        })),
      ]}
      {...props}
    >
      {children}
    </LayoutSidebar>
  );
};
