"use client";
import SpotifyLogo from "@/public/spotify.svg";
import Image from "next/image";
import { Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import NavItemList from "./UtilityComponent/NavItemList";
import useFetchUserDetails from "@/hooks/customHooks/useFetchUserDetails";
import { useState } from "react";
import DropDown from "./UtilityComponent/DropDown/DropDown";
import { redirect } from "next/navigation";

export default function NavbarPage() {
  const [user, setUser] = useState();
  useFetchUserDetails(setUser);

  return (
    <Navbar isBordered className="sticky top-0 z-10">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image
            src={SpotifyLogo}
            alt="Spotify Logo"
            width={30}
            height={30}
            className="justify-start mr-2 cursor-pointer"
            onClick={() => redirect("/")}
          />

          <p className="sm:block font-bold text-inherit mr-3">Spotify</p>
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-8">
          <NavItemList />
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center " justify="end">
        {/* <ThemeButton /> */}
        <DropDown />
      </NavbarContent>
    </Navbar>
  );
}
