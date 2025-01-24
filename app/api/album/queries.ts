import mongoose from 'mongoose';

export const getAlbumPipeline = (albumId : string) => [
  {
    $match: {
      _id: new mongoose.Types.ObjectId(albumId),
      isDeleted: false,
    },
  },
  {
    $lookup: {
      from: 'musics', // Replace with the correct collection name for music
      localField: 'musicIds',
      foreignField: '_id',
      as: 'musicDetails', // This will be the populated result
    },
  },
  {
    $project: {
      musicDetails: 1, // Include the populated musicDetails
      _id: 1, // Include any other fields from the album if needed
    },
  },
];

export const getAlbumByIDPipeline = (albumId : string) => [
  {$match: { _id: new mongoose.Types.ObjectId(albumId)}},
  {
    $lookup: {
      from: 'genres', // Collection name for genres
      localField: 'Genre', // Field to match in the albums collection
      foreignField: '_id',
      as: 'Genre', // Populated result
    }
  },
  {
    $lookup: {
      from: 'languages', // Collection name for languages
      localField: 'Language', // Field to match in the albums collection
      foreignField: '_id',
      as: 'Language', // Populated result
    }
  },
  {
    $lookup: {
      from: 'musics', // Collection name for music
      localField: 'musicIds', // Field to match in the albums collection
      foreignField: '_id',
      as: 'musicDetails', // Populated result
    }
  },
  {
    $project: {
      Genre: 1,
      Language: 1,
      musicDetails: 1,
      _id: 1,
      imageUrl : 1,
      name : 1,
      description : 1,
      Price : 1,
      Rating : 1,
      Label : 1
    }
  }
]; 

export const getAlbumByFilter = (filter : { isDeleted?: boolean , Label?: string}) => [
  { $match: filter },  
  {
    $lookup: {
      from: 'genres',  
      localField: 'Genre',  
      foreignField: '_id',  
      as: 'GenreDetails',  
    },
  },
  {
    $lookup: {
      from: 'languages', // The name of the collection for Language
      localField: 'Language', // The field in albums that references Language
      foreignField: '_id', // The field in Language collection
      as: 'LanguageDetails', // The name of the output array
    },
  },
  {
    $lookup: {
      from: 'musics', // The name of the collection for Music
      localField: 'musicIds', // The field in albums that references musicIds
      foreignField: '_id', // The field in Musics collection
      as: 'MusicDetails', // The name of the output array
    },
  },
  {
    $addFields: {
      Genre: { $arrayElemAt: ['$GenreDetails', 0] }, // Flatten GenreDetails
      Language: { $arrayElemAt: ['$LanguageDetails', 0] }, // Flatten LanguageDetails
      musicIds: '$MusicDetails', // Replace musicIds with full details
    },
  },
  {
    $project: {
      GenreDetails: 0, 
      LanguageDetails: 0,
      MusicDetails: 0,
    },
  },
];
 
export const musicAggregationPipeline = (musicIds : string[], userUid : string | undefined) => [
  {
    $match: { _id: { $in: musicIds }, isDeleted: false }, // Match music by IDs
  },
  {
    $lookup: {
      from: 'artists',
      let: { artistsIds: '$musicDetails.artistId' },
      pipeline: [
        {
          $match: {
            $expr: { $in: ['$_id', '$$artistsIds'] },
          },
        },
      ],
      as: 'artistDetails',
    },
  },
  {
    $lookup: {
      from: 'users',
      let: { artistsIds: '$artistDetails.userId' },
      pipeline: [
        {
          $match: {
            $expr: { $in: ['$_id', '$$artistsIds'] },
          },
        },
      ],
      as: 'artists',
    },
  },
  {
    $lookup: {
      from: 'users',
      pipeline: [
        {
          $match: { userId: userUid },
        },
        {
          $project: { likedMusics: 1 },
        },
      ],
      as: 'loggedInUser',
    },
  },
  {
    $unwind: {
      path: '$loggedInUser',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $addFields: {
      liked: { $in: ['$_id', { $ifNull: ['$loggedInUser.likedMusics', []] }] },
    },
  },
  {
    $unwind: {
      path: '$artists',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: '$_id',
      name: { $first: '$musicDetails.name' },
      description: { $first: '$musicDetails.description' },
      duration: { $first: '$musicDetails.duration' },
      artists: {
        $addToSet: {
          $concat: ['$artists.firstName', ' ', '$artists.lastName'],
        },
      },
      liked: { $first: '$liked' },
      email: { $first: '$artists.email' },
      price: { $first: '$price.amount' },
      currency: { $first: '$price.currency' },
      imageUrl: { $first: '$audioDetails.imageUrl' },
      audioUrl: { $first: '$audioDetails.audioUrl' },
      playCount: { $first: '$playCount' },
      peaks: { $first: '$audioDetails.peaks' },
    },
  },
  {
    $addFields: {
      artists: {
        $reduce: {
          input: '$artists',
          initialValue: '',
          in: {
            $cond: {
              if: { $eq: ['$$value', ''] },
              then: '$$this',
              else: { $concat: ['$$value', ', ', '$$this'] },
            },
          },
        },
      },
    },
  },
  {
    $sort: {
      playCount: -1,
      _id: 1,
    },
  },
]; 
