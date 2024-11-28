import React, { useMemo } from "react";
import { IFooterProps } from "../../types/types";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const Footer = (props: IFooterProps) => {
  const { data } = props;

  const renderedLinks = useMemo(() => {
    return (
      <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
        <div className="p-2 flex flex-row p-5">
          <div className="my-2 px-2 text-2xl"> Spotify</div>
          <FaYoutube size={30} className="ml-3 mt-2 " />
          <FaInstagram size={30} className="ml-3 mt-2" />
          <FaTiktok size={30} className="ml-3 mt-2" />
          <FaFacebook size={30} className="ml-3 mt-2" />
          <div></div>
        </div>

        {data?.map((link, index: number) => (
          <div key={index}>
            <div className="p-2 text-xl text-yellow-500">{link?.title}</div>
            {link.links?.map((linkName, indx) => (
              <div key={indx}>
                <div className="cursor-pointer hover:underline mt-2">{linkName}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }, [data]);
  return (
    <div className="p-4 bg-gray-800 text-white">
      <hr className="my-8 border-t border-gray-600" />
      <div className="flex flex-col items-center justify-center p-4">
        {renderedLinks}
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-400">© 2024 Your Company</div>
        <div className="text-sm text-gray-400">All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
