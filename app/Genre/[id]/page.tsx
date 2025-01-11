'use client';
import MusicListContainer from '@/common/MusicPlayer/MusicListContainer';
import { use } from 'react';
const GenrePage = ({ params }: { params: Promise<{ id: string; }> }) => {
  const Params: {
    id: string;
  } = use(params);
  const GenreId = Params.id;
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-6">
          <div className="space-y-6">
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
