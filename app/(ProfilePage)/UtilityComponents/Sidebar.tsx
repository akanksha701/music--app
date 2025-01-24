'use client';
import React, { useState } from 'react';
import { TbHistory } from 'react-icons/tb';
import { CgMusicNote } from 'react-icons/cg';
import { BiSolidAlbum } from 'react-icons/bi';
import { MdPodcasts } from 'react-icons/md';
import { PiMicrophoneStageLight } from 'react-icons/pi';
import { redirect, usePathname } from 'next/navigation';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useCreatePlayListMutation, useGetPlayListsQuery } from '@/services/playlists';
import toast from 'react-hot-toast';
import ButtonWithIcon from '@/common/buttons/ButtonWithIcon';
import { IoAddCircleOutline } from 'react-icons/io5';
const Profile = [
  { name: 'My Profile', label: 'MyProfile', route: '/MyProfile' },
  { name: 'Language And Genre', label: 'LanguageAndGenre', route: '/LanguageAndGenre' },
  { name: 'Album', label: 'Album', route: '/Album' },
  { name: 'AddMusic', label: 'AddMusic', route: '/AddMusic' },
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

  const handleCreatePlaylist = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
        {/* <p className="text-slate-500">My Profile</p> */}
        {Profile.map((item, index) => {
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

      {/* <div className="my-2">
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
      <ButtonWithIcon
        className={`border-1 border-electric-purple text-electric-purple 
        rounded-full hover:bg-electric-purple hover:text-white`}
        onClick={handleOpenDialog}
        icon={<GoPlus size={50} />}
        text={'New Playlist'}
      /> */}

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
          <ButtonWithIcon
            className={`border-1 border-electric-purple text-electric-purple 
        rounded-full hover:bg-electric-purple hover:text-white`}
            onClick={handleCloseDialog}
            text={'Cancel'}
          />
          <ButtonWithIcon
            className={`border-1 border-electric-purple text-electric-purple 
        rounded-full hover:bg-electric-purple hover:text-white `}
            onClick={handleCreatePlaylist}
            text={'Create'}
            icon={<IoAddCircleOutline
              style={{
                height: '1.8rem',
                width: '1.8rem',
              }}
            />}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
