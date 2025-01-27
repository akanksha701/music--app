import React from 'react';
import Image from 'next/image';
import { fetchApi } from '@/utils/helpers';
import { getAboutDetails } from '@/utils/apiRoutes';
import { Method } from './types/types';

export const Index = async () => {
  const data = await fetchApi(getAboutDetails, Method.GET);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {data?.aboutTitle || 'Discover, Play, and Enjoy Music Like Never Before.'}
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90">
              Your one-stop platform for music streaming, podcasts, and creating unforgettable playlists.
            </p>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={data?.aboutImage || '/default-image.jpg'}
              alt="Music App"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 pointer-events-none"></div>
      </section>

      {/* About Description */}
      <section className="container mx-auto   py-16 flex gap-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-4xl text-center align-center font-extrabold text-purple-700 mb-6">About SoundScape</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            {data?.aboutDescription ||
              `With SoundScape, it’s easy to find the right music or podcast for every moment – on your phone, your computer, your tablet, and more. There are millions of tracks and 
              episodes on SoundScape. So whether you’re behind the wheel, working out, partying, or relaxing, the right music or podcast is always at your fingertips. 
              Choose what you want to listen to, or let SoundScape surprise you. Browse through collections of friends, artists, 
              and celebrities, or create a radio station and just sit back. Soundtrack your life with SoundScape.`}
          </p>
        </div>

        <div className="rounded-2xl shadow-lg bg-gradient-to-r from-purple-700 to-purple-500 p-8 md:p-12">
          <h3 className="text-3xl text-white font-bold mb-4">
            {data?.popularTrackTitle || 'Get Your Beats Featured by Our Users'}
          </h3>
          <p className="text-lg font-light text-[#ccc]">
            Explore the top charts and trending playlists created by our community. Share your beats and get featured on the global stage!
          </p>
        </div>
      </section>

      {/* Popular Tracks Section */}
      <section className="text-white py-16 container mx-auto">
        <div>
          <h1 className="text-black text-4xl font-black text-center">
            Our <span className="text-purple-600">Achievements</span>
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Users */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-purple-600">1M+</h2>
            <p className="text-lg">Happy Users</p>
          </div>
          {/* Artists */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-purple-600">50K+</h2>
            <p className="text-lg">Talented Artists</p>
          </div>
          {/* Total Songs */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-purple-600">500K+</h2>
            <p className="text-lg">Total Songs</p>
          </div>
          {/* Playlists */}
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-purple-600">200K+</h2>
            <p className="text-lg">Playlists Created</p>
          </div>
        </div>
      </section>
      <section className="text-white py-16">
        <div className="container mx-auto">
          <h1 className="text-black text-4xl font-black text-center">
            Meet <span className="text-purple-600">Our Team</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h2 className="text-xl font-bold text-black">John Doe</h2>
              <p className="text-purple-600 text-sm">Software Engineer</p>
              <p className="text-center text-sm mt-2 text-gray-800">
                Passionate about building scalable solutions and crafting seamless user experiences.
              </p>
            </div>
            {/* Team Member 2 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h2 className="text-xl font-bold text-black">Jane Smith</h2>
              <p className="text-purple-600 text-sm">UI/UX Designer</p>
              <p className="text-center text-sm mt-2 text-gray-800">
                Creating intuitive designs that connect with users and elevate digital experiences.
              </p>
            </div>
            {/* Team Member 3 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h2 className="text-xl font-bold text-black">Alice Johnson</h2>
              <p className="text-purple-600 text-sm">Product Manager</p>
              <p className="text-center text-sm mt-2 text-gray-800">
                Skilled in coordinating teams and delivering exceptional products on time.
              </p>
            </div>
            {/* Team Member 4 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h2 className="text-xl font-bold text-black">Mike Williams</h2>
              <p className="text-purple-600 text-sm">Marketing Lead</p>
              <p className="text-center text-sm mt-2 text-gray-800">
                Focused on driving growth and engaging users through innovative strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" flex  
      bg-[linear-gradient(360deg,_rgba(127,8,144,1)_0%,_rgba(149,50,163,1)_24%,_rgba(174,99,185,1)_50%,_rgba(206,161,213,1)_79%,_rgba(255,255,255,1)_100%)] 
      text-white py-16">
        <div className="container mx-auto">
          <h1 className="text-black text-4xl font-black text-center mb-8">
            <span className="text-purple-600">Vision</span> & <span className="text-purple-600">Mission</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 flex flex-col gap-6 mx-auto place-items-center">
            {/* Vision Section */}
            <div className="flex flex-col items-center text-center bg-gray-800 p-8 rounded-lg shadow-md w-[50%]">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-600 text-white text-3xl font-bold rounded-full mb-6">
                👁️
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-sm text-gray-400">
                To revolutionize the way people experience music by connecting users with their favorite songs, artists, and moments through an intuitive platform.
              </p>
            </div>
            {/* Mission Section */}
            <div className="flex flex-col items-center text-center bg-gray-800 p-8 rounded-lg shadow-md  w-[50%]">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-600 text-white text-3xl font-bold rounded-full mb-6">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-sm text-gray-400">
                To empower artists, engage listeners, and deliver a personalized music experience by continuously innovating and fostering creativity.
              </p>
            </div>
          </div>
        </div>  
        <div className="container mx-auto h-full">
          <h1 className="text-black text-4xl font-black text-center mb-8">
            <span className="text-purple-600">Contact</span> Us
          </h1>
          <div className="flex justify-center">
            <form className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="text-white py-16 bg-gray-900">
        
      </section>




      {/* Customer Support Section */}
      {/* <section className="container mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <CustomerSupport
            CustomerServiceAndSupport={data?.CustomerServiceAndSupport || []}
            serviceTitle={data?.serviceTitle || 'Customer Service and Support'}
          />
        </div>
      </section> */}
    </div>
  );
};

export default Index;
