import { NavbarItem, Link } from "@nextui-org/react";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { IItem } from "../../types/types";
import Tooltip from "@/common/tooltip/Tooltip";
import HoverCard from "./HoverCard";
import { useGetPlayListsQuery } from "@/services/playlists";
import { useGetartistsQuery } from "@/services/artists";

const navItems: IItem[] = [
  { label: "Browse", route: "/Browse" },
  { label: "Pricing", route: "/Pricing" },
  { label: "FAQ", route: "/FAQ" },
  { label: "About", route: "/About" },
];
const NavItemList: React.FC = () => {
  const pathname = usePathname();
  const { data: playLists } = useGetPlayListsQuery(undefined);
  const { data: artistList } = useGetartistsQuery(undefined);

  if (!playLists || !artistList) {
    return null;
  }
  return (
    <>
      {/* <Tooltip
        content={
          <HoverCard
            topArtists={playLists?.topsPlaylists}
            topPlaylists={artistList?.topArtists}
          />
        }
        children={
          <button
            onClick={() => redirect("/Browse")}
            className={`${
              pathname === "/Browse" ? "text-purple-600" : "text-black"
            } cursor-pointer`}
            color="foreground"
          >
            Browse
          </button>
        }
      /> */}
      {navItems.map((item: IItem) => {
        const isActive = pathname === item.route;
        return (
          <NavbarItem key={item.route}>
            <Link
              onClick={() => redirect(item.route)}
              className={`${
                isActive ? "text-purple-600" : "text-black"
              } cursor-pointer`}
              color="foreground"
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      })}
    </>
  );
};

export default NavItemList;
