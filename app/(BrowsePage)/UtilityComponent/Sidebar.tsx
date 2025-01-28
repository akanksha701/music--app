'use client';
import React, { useState } from 'react';
import { MdPodcasts, MdHistory, MdAlbum, MdMusicNote, MdMic } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import { redirect, usePathname } from 'next/navigation';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { useCreatePlayListMutation, useGetPlayListsQuery } from '@/services/playlists';
import toast from 'react-hot-toast';
import ButtonWithIcon from '@/common/buttons/ButtonWithIcon';
import { IoAddCircleOutline } from 'react-icons/io5';
const Browse = [
  { name: 'New Releases', label: 'NewRelease', route: '/NewRelease' },
  { name: 'Top Charts', label: 'TopCharts', route: '/TopCharts' },
  { name: 'Top Playlists', label: 'TopPlaylists', route: '/TopPlaylists' },
  { name: 'Podcasts', label: 'Podcasts', route: '/PodCasts' },
  { name: 'Top Artists', label: 'TopArtists', route: '/TopArtists' },
  { name: 'Radio', label: 'Radio', route: '/Radio' },
];

const iconStyle = {
  fill: 'currentColor',
  fontWeight: 'normal',
  size: 25,
};

const Library = [
  { name: 'History', icon: <MdHistory style={iconStyle} size={25} /> },
  { name: 'Liked Songs', icon: <MdMusicNote style={iconStyle} size={25} /> },
  { name: 'Albums', icon: <MdAlbum style={iconStyle} size={25} /> },
  { name: 'Podcasts', icon: <MdPodcasts style={iconStyle} size={25} /> },
  { name: 'Artists', icon: <MdMic style={iconStyle} size={25} /> },
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
    <div className="lg:flex flex-col   sm:flex flex-col items-center justify-items-center">
      <div className="m-6">
        <p className="text-slate-500 m-4">Browse</p>
        {Browse.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <div
              key={index}
              className={`${isActive ? 'font-bold text-purple-600' : 'font-light text-black'} m-4 cursor-pointer hover:text-slate-600`}
            >
              <p onClick={() => redirect(item.label)} className="cursor-pointer  my-2">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>

      <div className="m-6">
        <p className="text-slate-500 m-4">Library</p>
        {Library.map((item, index) => (
          <div key={index} className="m-4 flex items-center">
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
      />

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
