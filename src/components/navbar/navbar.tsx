import { Fragment } from "react";

import Link from "next/link";

import { Disclosure, Menu, Transition } from "@headlessui/react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { clsx } from "clsx";

import { NavbarButtonDesktop, NavbarButtonMobile } from "./button";
import {useRouter} from "next/router";

export type NavbarProps = {
  links: {
    active?: boolean;
    href: string;
    text: string;
  }[];
  isMenu: boolean;
};

const menu = {
  items: [
    {
      href: "/profile/rentals",
        text: "Twoje wypożyczenia",
    },
    {
      href: "/sign-out",
      text: "Wyloguj się",
    },
  ],
  label: "Otwórz menu użytkownika",
  text: "Profil",
};

export const Navbar = ({ links, isMenu }: NavbarProps) => {
  const { asPath } = useRouter();
  return (
  <Disclosure
    as="nav"
    className="fixed top-0 left-0 right-0 z-10 bg-white shadow"
  >
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Otwórz menu</span>
                {open ? (
                  <XMarkIcon aria-hidden="true" className="block h-6 w-6" />
                ) : (
                  <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {links.map(({ active, href, text }, index) => (
                  <NavbarButtonDesktop active={active} href={href} key={index}>
                    {text}
                  </NavbarButtonDesktop>
                ))}
              </div>
            </div>
            {isMenu ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button
                      className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">{menu.label}</span>
                    {menu.text}
                  </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {menu.items.map(({href, text}, index) => (
                        <Menu.Item key={index}>
                          {({active}) => (
                              <Link
                                  className={clsx(
                                      "block px-4 py-2 text-sm text-gray-700",
                                      active && "bg-gray-100"
                                  )}
                                  href={href}
                              >
                                {text}
                              </Link>
                          )}
                        </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
                :
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavbarButtonDesktop href="/register" active={asPath.startsWith('/register')}>
                    Zarejestruj się
                </NavbarButtonDesktop>
                <NavbarButtonDesktop href="/login" active={asPath.startsWith('/login')}>
                  Zaloguj się
                </NavbarButtonDesktop>
                </div>
            }
          </div>
        </div>
        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 pt-2 pb-4">
            {links.map(({ active, href, text }, index) => (
              <NavbarButtonMobile active={active} href={href} key={index}>
                {text}
              </NavbarButtonMobile>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)};
