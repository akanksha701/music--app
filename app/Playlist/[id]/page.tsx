"use client"
import { Button } from '@/components/ui/button'; 
import { FaEdit } from "react-icons/fa"; 
import { MdDelete } from 'react-icons/md'; 
import SecondaryButton from '@/common/buttons/SecondaryButton'; 
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'; 
import { use, useState } from 'react'; 
import MusicListContainer from '@/common/MusicPlayer/MusicListContainer'; 
import Link from 'next/link';

const PlaylistPage = ({ params }: { params: any }) => {
  const Params: {
      id : string
    } = use(params);
    const playlistId = Params.id; 

  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog visibility

  // Placeholder for handle delete
  const handleDelete = () => {
    // Logic for deleting playlist
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="edit-container w-full flex justify-end gap-4">
        <Link href={{
          pathname: '/AddPlaylist',
          query: { playlistId }, // Pass playlistId as a query parameter
        }}>
          <Button
            className="border-2 border-[#9333ea] flex justify-between items-center text-white bg-[#9333ea] rounded-full hover:bg-white hover:text-black hover:border-[#9333ea]">
            <FaEdit style={{ height: "1.5rem", width: "1.5rem" }} />
            <span className="text-lg">Edit Playlist</span>
          </Button>
        </Link>

        <SecondaryButton name='Delete' onClick={() => setDialogOpen(true)} type='button'>
          <MdDelete style={{ height: "1.5rem", width: "1.5rem", color: "#9333ea" }} />
        </SecondaryButton>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Section: Playlist Info */}
          <div className="lg:col-span-1 space-y-6">
            <img
              src="/genres/images/default.jpg" // Placeholder for cover image
              alt="Playlist Cover"
              className="h-80 object-cover rounded-lg shadow-lg"
            />
            <h2 className="text-3xl font-semibold">Playlist Name</h2>
            <p className="text-lg text-gray-600">Description: Playlist description goes here...</p>
            <div className="flex flex-col">
              <span className="text-gray-500">Genres: Genre 1, Genre 2, Genre 3</span>
              <span className="text-gray-500">Languages: English, Spanish</span>
              <span className="text-gray-500">Artists: Artist 1, Artist 2</span>
              <span className="text-gray-500">Mode: Public</span>
            </div>
          </div>

          {/* Right Section: Music Tracks */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold p-4">Music Tracks</h3>
            <MusicListContainer PlaylistId={playlistId} />
            No songs Yet
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. Do you want to delete this playlist?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className='bg-red-600 hover:bg-red-700 text-white' onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlaylistPage;
