import { NavbarItem, Link } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";
import { IItem } from "../../types/types";
import Tooltip from "@/common/tooltip/Tooltip";
import HoverCard from "./HoverCard";
import { useGetPlayListsQuery } from "@/services/playlists";
import { useGetartistsQuery } from "@/services/artists";
const NavItemList: React.FC = () => {
  const navItems: IItem[] = [
    { label: "Pricing", route: "/Pricing" },
    { label: "FAQ", route: "/FAQ" },
    { label: "About", route: "/About" },
  ];
  const { data: playLists } = useGetPlayListsQuery(undefined);
  const { data: artistList } = useGetartistsQuery(undefined);

  if (!playLists || !artistList) {
    return null;
  }
  return (
    <>
      <Tooltip
        content={
          <HoverCard
            topArtists={playLists?.topsPlaylists}
            topPlaylists={artistList?.topArtists}
          />
        }
        children={
          <Link
            onClick={() => redirect("/Browse")}
            className="cursor-pointer"
            color="foreground"
          >
            Browse
          </Link>
        }
      />
      {navItems.map((item: IItem) => (
        <NavbarItem key={item.route}>
          <Link
            onClick={() => redirect(item.route)}
            className="cursor-pointer"
            color="foreground"
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
};

export default NavItemList;
