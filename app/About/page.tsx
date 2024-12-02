import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <div className="p-20">
      <div className="grid grid-cols-2 gap-8 ">
        <div className=" text-6xl p-10 text-white font-semibold bg-purple-600 transform transition duration-1000 hover:scale-105 bg-purple-500 rounded-md">
          Your one-stop music streaming platform to discover, play, and enjoy
          music like never before.
        </div>
        <div className="  text-6xl   bg-slate-200 rounded-md">
          <Image
            src="https://plus.unsplash.com/premium_photo-1732042392355-82353f05f45d?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Music App"
            width={600} 
            height={400} 
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
