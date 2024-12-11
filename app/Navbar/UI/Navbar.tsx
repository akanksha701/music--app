"use client";
import SoundScapeLogo from "@/public/images/SoundScapeLogo.png";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import NavItemList from "./UtilityComponent/NavItemList";
import useFetchUserDetails from "@/hooks/customHooks/useFetchUserDetails";
import { useState } from "react";
import DropDown from "./UtilityComponent/DropDown/DropDown";
import { redirect } from "next/navigation";

export default function NavbarPage() {
  const [user, setUser] = useState();
  useFetchUserDetails(setUser);

  return (
    <>
      <Navbar isBordered className="sticky top-0 z-10">
        <NavbarContent justify="start">
          <NavbarBrand
            className="mr-4 cursor-pointer "
            onClick={() => redirect("/")}
          >
            <Image
              src={SoundScapeLogo}
              alt="SoundScape Logo"
              width={50}
              height={50}
              className="justify-start mr-2 cursor-pointer"
            />

            <p className="sm:block font-bold text-inherit mr-3">SoundScape</p>
          </NavbarBrand>
          <NavbarContent className="flex sm:flex-col md:flex-row lg:flex-row gap-2 sm:gap-2 md:gap-6 lg:gap-8 lg:mx-10">
            <NavItemList />
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center " justify="end">
          <DropDown />
        </NavbarContent>
      </Navbar>
    </>
  );
}
