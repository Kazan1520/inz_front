import { Sidebar, type SidebarProps } from "@/components/sidebar";

import { LayoutMain, type LayoutMainProps } from "./main";

export type LayoutSidebarProps = LayoutMainProps & Pick<SidebarProps, "links">;

export const LayoutSidebar = ({
  children,
  links,
  withoutMain,
  ...props
}: LayoutSidebarProps) => (
  <LayoutMain withoutMain {...props}>
    <Sidebar links={links} />
    {withoutMain ? (
      children
    ) : (
      <main className="mt-16 flex flex-grow flex-col md:ml-64">{children}</main>
    )}
  </LayoutMain>
);
