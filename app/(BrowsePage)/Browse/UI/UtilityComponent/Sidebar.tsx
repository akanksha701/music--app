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
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import PrimaryButton from '@/common/buttons/PrimaryButton';
import { useCreatePlayListMutation, useGetPlayListsQuery } from '@/services/playlists';
import SecondaryButton from '@/common/buttons/SecondaryButton';
import toast from 'react-hot-toast';
import Link from 'next/link';

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
  const [createPlaylist] = useCreatePlayListMutation();
  const { data: Playlists } = useGetPlayListsQuery({});

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleCreatePlaylist = async () => {
    if (playlistName.trim()) {
      await createPlaylist({ name: playlistName, user: '675ab45ad8496e8fd5fb50db' });
      toast.success('Playlist created successfully!');
      setPlaylistName('');
      handleCloseDialog();
    } else {
      alert('Please enter a playlist name');
    }
  };

  return (
    <div className="lg:flex flex-col p-8 sm:flex flex-col items-center justify-items-center my-2">
      <div className="my-2">
        <p className="text-slate-500">Browse</p>
        {Browse.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <div
              key={index}
              className={`${isActive ? 'text-purple-600' : 'text-black'} cursor-pointer hover:text-slate-600`}
            >
              <p onClick={() => redirect(item.label)} className="cursor-pointer font-light my-2">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>

      <div className="my-2">
        <p className="text-slate-500">Library</p>
        {Library.map((item, index) => (
          <div key={index} className="flex items-center my-2">
            {item.icon}
            <span className="ml-2">
              <p className="cursor-pointer font-light">{item.name}</p>
            </span>
          </div>
        ))}
      </div>

      <Button
        className={`border-1 border-electric-purple text-electric-purple 
          rounded-full hover:bg-electric-purple hover:text-white`}
        onClick={handleOpenDialog}
      >
        <GoPlus size={50} /> New Playlist
      </Button>

      {Playlists?.data?.length > 0 && (
        <div className="my-2">
          <p className="text-slate-600">Playlists</p>
          {Playlists.data.map((item: {_id:string,name:string}, index: number) => (
            <div key={index} className="flex items-center my-2  ">
              <span className="ml-2 border-slate-300 rounded-md p-1 border-2">
                <Link href={`/Playlist/${item._id}`}>
                  <p className="cursor-pointer font-light">{item.name}</p>
                
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Create a New Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Name"
            type="text"
            fullWidth
            variant="outlined"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <SecondaryButton name='Cancel' onClick={() => handleCloseDialog()} type='button'  />
            
          <PrimaryButton onClick={handleCreatePlaylist} name="Create" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
