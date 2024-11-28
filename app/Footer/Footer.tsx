import React, { useMemo } from "react";
import { IFooterProps } from "../Home/types/types";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = (props: IFooterProps) => {
  const { data } = props;
  const icons = [
    <FaYoutube key="youtube" size={30} />,
    <FaInstagram key="instagram" size={30} />,
    <FaTiktok key="tiktok" size={30} />,
    <FaFacebook key="facebook" size={30} />,
  ];

  const renderedLinks = useMemo(() => {
    return (
      <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left ">
        <div className="flex flex-row items-center justify-center space-x-5 my-5">
          <div className="my-2 px-2 text-2xl font-semibold text-purple-600">
            Spotify
          </div>

          <div className="flex space-x-3 cursor-pointer">{icons}</div>
        </div>

        {data?.map((link, index: number) => (
          <div key={index} className="p-2">
            <div className="text-xl text-purple-600 font-semibold">
              {link?.title}
            </div>
            {link.links?.map((linkName, indx) => (
              <div key={indx} className="cursor-pointer hover:underline mt-2">
                {linkName}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }, [data]);

  return (
    <div className="p-4 bg-slate-900 text-white">
      <hr className="my-8 border-t border-gray-600" />

      <div className="flex flex-col items-center justify-center p-4">
        {renderedLinks}
      </div>
      <hr className="my-8 border-t border-gray-600" />

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">© 2024 Sportify</div>
        <div className="text-sm text-gray-400">All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
