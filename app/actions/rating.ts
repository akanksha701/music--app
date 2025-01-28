import { fetchApi } from '@/utils/helpers';
import { Method } from '../About/types/types';
import toast from 'react-hot-toast';
import { IRatingType, TAGS } from '../(BrowsePage)/Browse/types/types';


export const ratingAction = async (
  userId: string,
  id: string,
  rating: number,
  type: IRatingType // Use the defined union type here
): Promise<void> => {
  try {
    const apiUrlMap: Record<IRatingType, string> = {
      Genres: '/api/rating/genre',
      Musics: '/api/rating/music',
      Album: '/api/rating/album',
      NewReleases: '/api/rating/music'
    };

    const apiUrl = apiUrlMap[type as IRatingType];
    if (!apiUrl) {
      throw new Error('Invalid rating type');
    }
    const body = {
      userId,
      rating,
      ...(type === TAGS.GENRE && { genreId: id }), 
      ...([TAGS.MUSIC as string, TAGS.NEW_RELEASE].includes(type) && { musicId: id }), 
      ...(type === TAGS.ALBUMS && { albumId: id })
    };

    const response = await fetchApi(apiUrl, Method.POST, body);
    toast.success(response.message);

  } catch (error) {
    toast.error((error as Error).message || 'An error occurred');
    throw error; 
  }
};
