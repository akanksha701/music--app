"use client";
import SoundScapeLogo from "@/public/images/SoundScapeLogo.png";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import DropDown from "./UtilityComponent/DropDown/DropDown";
import { redirect } from "next/navigation";
import NavItemList from "./UtilityComponent/NavItemList";
import { useUserSession } from "@/hooks/customHooks/use-user-session";
import { checkIfUserExists, createUser } from "@/lib/firebase/userActions";
import { User } from "firebase/auth";
import { useEffect } from "react";

export default function NavbarPage({ session }: any) {

  // const saveUser = async (user: User | null) => {
  //   if (user?.uid as string) {
  //     const userExists = await checkIfUserExists(user?.uid as string);
  //     console.log('userExists',userExists)
  //     if (!userExists) {
  //       const newUser = await createUser(user);
  //       console.log(newUser,'newUser')
  //       if (newUser) {
  //         console.log("User created successfully in the database");
  //       } else {
  //         console.error("Error creating new user in MongoDB");
  //       }
  //     } else {
  //       console.log("User already exists in the database");
  //     }
  //   }
  // };

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
          <DropDown session={session}/>
        </NavbarContent>
      </Navbar>
    </>
  );
}
