"use client";

import { Button } from '@/components/ui/button';
import { Rating, Button as BTN } from '@mui/material';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import SecondaryButton from '@/common/buttons/SecondaryButton';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import MusicListContainer from '@/common/MusicPlayer/MusicListContainer';

const GenrePage = ({ params }: { params: any }) => {
  const Params: {
    id: string;
  } = use(params);
  const GenreId = Params.id;

  const router = useRouter();

  const [isDialogOpen, setDialogOpen] = useState(false); // State for dialog visibility





  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-6">
          {/* Genre Info */}
          <div className="space-y-6">
            {/* <h2 className="text-3xl font-semibold">{genre.name}</h2> */}

            {/* <p className="text-lg text-gray-600">Description: {genre.description}</p> */}


          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6 min-h-50vh"> 
        <MusicListContainer GenreId={GenreId} />
      </div>

    </div>
  );
};

export default GenrePage;
