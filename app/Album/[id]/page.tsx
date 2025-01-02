"use client";

import { Button } from '@/components/ui/button'; 
import { useDeleteAlbumMutation, useGetAlbumByIdQuery } from '@/services/album';
import { Rating, Button as BTN } from '@mui/material';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use,   useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import SecondaryButton from '@/common/buttons/SecondaryButton';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { Album } from '../types/types';
import MusicListContainer from '@/common/MusicPlayer/MusicListContainer';
import Loading from './loading';


const AlbumPage = ({ params }: { params: any }) => {
  const Params: {
    id : string
  } = use(params);
  const AlbumId = Params.id;

  const { data: albumData, isLoading, isError } = useGetAlbumByIdQuery(AlbumId);
  const [deleteAlbum] = useDeleteAlbumMutation();
  const router = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog visibility

  const handleDelete = async () => {
    const Res = await deleteAlbum(albumData.data._id);
    console.log("albumData : " , albumData)

    if(Res.error){
      toast.error("Error while deleting album");
      setDialogOpen(false)
    }else{
      router.push("/Album");
      toast.success("Album deleted successfully!");
    }
  };

  // Loading and error handling
  if (isLoading) {
    return  <Loading></Loading>
  }

  if (isError) {
    return <div className="text-center text-xl">Album not found or an error occurred!</div>;
  }

  const album : Album  = albumData.data;  // The album data you needs
  console.log("ALBUM : "   , album)
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">


      <div className="edit-container w-full flex justify-end gap-4">


        <Link href={{
          pathname: '/AddAlbum',
          query: { albumId: album._id }, // Pass albumId as a query parameter
        }}>
          <Button
            className="border-2 border-[#9333ea] flex justify-between items-center text-white bg-[#9333ea] rounded-full hover:bg-white hover:text-black hover:border-[#9333ea]">
            <FaEdit
              style={{
                height: "1.5rem",
                width: "1.5rem",
              }}
            />
            <span className="text-lg">Edit Album</span>
          </Button>
        </Link>
     

        <SecondaryButton name='Delete'  onClick={() => setDialogOpen(true)} type='button' >
          <MdDelete
            style={{
              height: "1.5rem",
              width: "1.5rem",
              color: "#9333ea",
            }}
          />
        </SecondaryButton>




      </div>

      <div className="max-w-7xl mx-auto px-6 ">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Section: Album Info (33%) */}
          <div className="lg:col-span-1 space-y-6">
            <img
              src={album.imageUrl}
              alt={album.name}
              className="h-80 object-cover rounded-lg shadow-lg"
            />

            <h2 className="text-3xl font-semibold">{album.name}</h2>


            <p className="text-lg text-gray-600">Desc: {album.description}</p>



            <p className="text-lg text-gray-600">Price: {album.Price}</p>

            <div className="flex flex-col">
              <div className="w-full flex justify-start py-2 pb-4">
                <Rating
                  value={album.Rating}
                  // onChange={(event, newValue) => handleRatingChange(0, newValue || 0)}
                  readOnly={true}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "rgba(255, 188, 3, 1)", // Set custom star color
                    },
                    "& .MuiRating-iconHover": {
                      color: "rgba(255, 188, 3, 0.8)", // Optional hover effect
                    },
                  }}
                />
              </div>
              <span className="text-gray-500">Genres: {album.Genre?.map((genre) => genre.name).join(", ")}</span>
              <span className="text-gray-500">Languages: {album.Language?.map((language) => language.name).join(", ")}</span>
            </div>
          </div>

          {/* Right Section: Music List (66%) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-semibold p-4">Music Tracks</h3>
            
        <MusicListContainer AlbumId={AlbumId}  ></MusicListContainer>

          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action cannot be undone. Do you want to delete this album?</p>
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

export default AlbumPage;


