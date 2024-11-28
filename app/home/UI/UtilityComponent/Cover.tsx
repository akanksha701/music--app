import React from "react";

const Cover = () => {
  return (
    <>
      <section
        className="text-black py-20"
        style={{
          backgroundImage: "url('/images/MarketingBG.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold m-4">
            Amplify your music authenticity, visit
            <a
              href="http://localhost:3000"
              target="_blank"
              className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-bottom bg-no-repeat bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-[background-size]"
            >
              Spotify
            </a>
          </h1>
          <p className="text-xl mb-8">
            Stream millions of songs and podcasts, anytime, anywhere.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100">
            Start Listening Free
          </button>
        </div>
      </section>
    </>
  );
};

export default Cover;
