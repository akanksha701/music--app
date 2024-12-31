'use client';
import React, { useState } from 'react';
import { TbHistory } from 'react-icons/tb';
import { CgMusicNote } from 'react-icons/cg';
import { BiSolidAlbum } from 'react-icons/bi';
import { MdPodcasts } from 'react-icons/md';
import { PiMicrophoneStageLight } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { GoPlus } from 'react-icons/go';
import { redirect, usePathname } from 'next/navigation';
import NextInput from '@/common/inputs/Input';
import { useForm } from 'react-hook-form';
import SecondaryButton from '@/common/buttons/SecondaryButton';
import PrimaryButton from '@/common/buttons/PrimaryButton';
import { IoMdClose } from "react-icons/io";
import { useCreatePlayListMutation, useGetPlayListsQuery } from '@/services/playlists';
const Browse = [
  { name: 'New Releases', label: 'NewRelease', route: '/NewRelease' },
  { name: 'Top Charts', label: 'TopCharts', route: '/TopCharts' },
  { name: 'Top Playlists', label: 'TopPlaylists', route: '/TopPlaylists' },
  { name: 'Podcasts', label: 'Podcasts', route: '/PodCasts' },
  { name: 'Top Artists', label: 'TopArtists', route: '/TopArtists' },
  { name: 'Radio', label: 'Radio', route: '/Radio' },
];

const Library = [
  { name: 'History', icon: <TbHistory size={25} /> },
  { name: 'Liked Songs', icon: <CgMusicNote size={25} /> },
  { name: 'Albums', icon: <BiSolidAlbum size={25} /> },
  { name: 'Podcasts', icon: <MdPodcasts size={25} /> },
  { name: 'Artists', icon: <PiMicrophoneStageLight size={25} /> },
];

const Sidebar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const [ createPlaylist ] = useCreatePlayListMutation()
  const {data : Playlists, isLoading} = useGetPlayListsQuery({})

if(!isLoading){
  console.log("data , " , Playlists)
}
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCreatePlaylist = async() => {
    if (playlistName.trim()) {
      // Logic to create the playlist can go here (e.g., API call, state update)
      const Response = await createPlaylist({ name: playlistName , user : "675ab45ad8496e8fd5fb50db"}) 
      console.log("Response  : " , Response)
      console.log('Playlist created:', playlistName);
      setPlaylistName('');
      handleCloseDialog();
    } else {
      alert('Please enter a playlist name');
    }
  };

  return (
    <div className="lg:flex flex-col  p-8 sm:flex flex-col items-center justify-items-center my-2">
      <div className="my-2">
        <p className="text-slate-500">Browse</p>
        {Browse.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <div
              key={index}
              className={`${isActive ? 'text-purple-600' : 'text-black'
                } cursor-pointer hover:text-slate-600`}
            >
              <p
                onClick={() => redirect(item.label)}
                className="cursor-pointer font-light my-2"
              >
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="my-2">
        <p className="text-slate-500">Library</p>
        {Library.map((item, index) => {
          return (
            <div key={index} className="flex items-center my-2">
              {item.icon}
              <span className="ml-2">
                <p className="cursor-pointer font-light">{item.name}</p>
              </span>
            </div>
          );
        })}
      </div>
      <Button
        className="border-1  border-electric-purple text-electric-purple rounded-full hover:bg-electric-purple hover:text-white"
        onClick={handleOpenDialog}
      >
        <GoPlus size={50} /> New Playlist
      </Button>

      {Playlists?.data && Playlists?.data?.length > 0 && (
        <div className="my-2">
          <p className="text-slate-600">Playlists</p>
          {Playlists.data.map((item : any, index : any) => {
            return (
              <div key={index} className="flex items-center my-2">
                <span className="ml-2">
                  <p className="cursor-pointer font-light">{item.name}</p>
                </span>
              </div>
            );
          })}
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <div className='flex justify-between items-start'>
              <h3 className="text-xl mb-4">Create a New Playlist</h3>
              <IoMdClose className='text-2xl cursor-pointer'  onClick={handleCloseDialog}></IoMdClose>
            </div>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter playlist name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />

            {/* <NextInput
              id="name"
              name="name"
              label="Name"
              placeholder="Enter album name"
              register={register}
              options={{ required: "Name is required" }}
              errors={errors}
              required={true} 
            >

            </NextInput> */}
            <div className="flex justify-end space-x-4">
              <SecondaryButton onClick={handleCloseDialog}
                name={"Cancel"} type={"button"}
              > </SecondaryButton>
              <PrimaryButton 
                onClick={handleCreatePlaylist}
                name={"Create"} type={"button"}
              >
                Create
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sidebar;
