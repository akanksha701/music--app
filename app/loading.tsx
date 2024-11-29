import React from "react";
import { FaMusic } from "react-icons/fa"; // Import FaMusic from react-icons/fa

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative flex items-center justify-center w-24 h-24 border-4 border-purple-600 border-t-transparent rounded-full animate-spin">
          <FaMusic className="absolute w-12 h-12 text-purple-600" />
        </div>
        <span className="text-white font-semibold text-xl">
          Loading Music...
        </span>
      </div>
    </div>
  );
};

export default Loading;
