// 'use client';
// import React from 'react';
// import NextInput from '@/common/inputs/Input';
// import FileUploadInput from '@/common/inputs/FileUploadInput';
// import toast from 'react-hot-toast';
// import { useAddAlbumMutation, useUpdateAlbumMutation } from '@/services/album';
// import { useRouter } from 'next/navigation';
// import { IAddAlbumFormProps, ErrorResponseType } from '../types/types';
// import {   SubmitHandler, useForm } from 'react-hook-form';

// const AddAlbumForm = (props: IAddAlbumFormProps) => {
//   const { register, handleSubmit, control, formState: { errors } } = useForm<FormDataType>();
//   const [addAlbum] = useAddAlbumMutation();
//   const [updateAlbum] = useUpdateAlbumMutation();
//   const router = useRouter();
//   const { selectedSongs, defaultData } = props;
//   const SelectedLanguages = selectedSongs.map((song) => song.language);
//   const SelectedGenre = selectedSongs.map((song) => song.genre);
//   const SelectedMusic = selectedSongs.map((song) => song.id);

//   type FormDataType = {
//     imageUrl?: File | string|null;
//     name: string;
//     description: string;
//     price: string;
//     genreIds: string[]; 
//     songIds: string[];
//     languageIds: string[];
//   };
//   const onSubmit: SubmitHandler<FormDataType>= async (data)=> {
//     const formData = new FormData();
//     if (data.imageUrl instanceof File) {
//       formData.append('image', data.imageUrl);  
//     }
//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     formData.append('price', data.price);
//     formData.append('genreIds', JSON.stringify(SelectedGenre));
//     formData.append('songIds', JSON.stringify(SelectedMusic));
//     formData.append('languageIds', JSON.stringify(SelectedLanguages));

//     const Tid = toast('Loading...');
//     try {
//       let Response;
//       if (defaultData.albumId) {
//         formData.append('albumId', defaultData.albumId);
//         Response = await updateAlbum({
//           albumId: defaultData.albumId,
//           data: formData,
//         });
//       } else {
//         Response = await addAlbum(formData);
//       }

//       if (Response && Response.data) {
//         toast.dismiss(Tid);
//         toast.success('Album Added');
//         props.handleCloseDialog();
//         router.push('/Album');
//       } else {
//         toast.error(
//           (Response.error as ErrorResponseType).data?.error ||
//             'Something went wrong'
//         );
//         toast.dismiss(Tid);
//       }
//     } catch (error) {
//       throw new Error(`${error}`);
//       toast.dismiss(Tid);
//     }
//   };
//   return (
//     <div className="bg-gray-100 ">
//       <style>
//         {`
//           ::-webkit-scrollbar {
//             display: none;  /* Chrome, Safari, Opera */
//           }
//           body {
//             -ms-overflow-style: none;  /* Internet Explorer 10+ */
//             scrollbar-width: none;  /* Firefox */
//           }
//         `}
//       </style>
//       <form
//         id={props.formId}
//         onSubmit={handleSubmit(onSubmit)}
//         className="  bg-white    max-w-full   "
//       >
//         <div className="flex flex-col w-full space-y-6 flex-wrap">
//           <div className="flex flex-col">
//             <NextInput
//               id="name"
//               name="name"
//               label="Album Name"
//               placeholder="Enter album name"
//               register={register}
//               options={{ required: 'Name is required' }}
//               errors={errors}
//               required={true}
//               defaultValue={defaultData?.albumName || ''}
//             />
//           </div>

//           <div className="flex flex-row justify-between flex-wrap ">
//             <div className="selectBoxInput w-[45%]">
//               {/* Description Field */}
//               <NextInput
//                 name="description"
//                 id="description"
//                 label="Description"
//                 placeholder="Enter description "
//                 register={register}
//                 options={{ required: 'Description is required' }}
//                 errors={errors}
//                 required={true}
//                 defaultValue={defaultData?.albumDescription || ''}
//               />
//             </div>
//             <div className="selectBoxInput w-[45%]">
//               <NextInput
//                 type="number"
//                 name="price"
//                 id="price"
//                 label="Price"
//                 placeholder="Enter price "
//                 register={register}
//                 errors={errors}
//                 defaultValue={defaultData?.albumPrice || 0}
//               />
//             </div>
//           </div>

//           <div className="flex flex-row justify-between flex-wrap">
//             <FileUploadInput
//               name="imageUrl"
//               control={control}
//               label="Album Image"
//               accept="image/png, image/jpeg"
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddAlbumForm;
