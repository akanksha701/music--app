'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './SmallGrid.css';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

import {
  useDeleteGenreMutation,
  useUpdateGenreMutation,
} from '@/services/genre';
import {
  useDeleteLanguageMutation,
  useUpdateLanguageMutation,
} from '@/services/languages';
import MenuButton from '../buttons/PopoverButton';
import { IGenre, ISmallGridProps } from '../types/types';

const SmallGrid = ({ columns, data, label, moreBox, addBox }: ISmallGridProps) => {
  const { handleSubmit } = useForm<IGenre>(); 
  const [gridData, setGridData] = useState<IGenre[]>(data); 
  const [isEdit, setEdit] = useState<boolean>(false); 
  const [currentRow, setCurrentRow] = useState<IGenre | null>(null); 
  const [editedRow, setEditedRow] = useState<IGenre | null>(null); 

  const handleEdit = useCallback((rowData: IGenre) => {
    setEdit(true);
    setCurrentRow(rowData);
    setEditedRow({ ...rowData });
  }, []);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      if (label === 'language') {
        await deleteLanguage({ id });
      } else {
        await deleteGenre({ id });
      }

      toast.success('Data deleted successfully!');
      setGridData((prevData) => prevData.filter((row) => row._id !== id));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error('Unknown error occurred');
      }
    }
  };

  const memoizedColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      className: column.className || '',
    }));
  }, [columns]);

  const [updateGenre] = useUpdateGenreMutation();
  const [updateLanguage] = useUpdateLanguageMutation();
  const [deleteLanguage] = useDeleteLanguageMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const onSubmit: SubmitHandler<IGenre> = async () => {
    try {
      const formData = new FormData();
      if (editedRow?.imageUrl) {
        formData.append('img', editedRow?.imageUrl as unknown as Blob); // Ensure it's a Blob or File
      }

      Object.keys(editedRow || {}).forEach((key) => {
        if (key !== 'imageUrl') {
          const value = editedRow ? editedRow[key as keyof IGenre] : undefined;
          if (value !== undefined) {
            formData.append(key, value as string);
          }
        }
      });

      let res;
      if (label === 'language') {
        res = await updateLanguage({
          id: currentRow?._id as string,
          data: formData,
        });
      } else {
        res = await updateGenre({
          id: currentRow?._id as string,
          data: formData,
        });
      }

      const updatedRow = res.data.data;

      setGridData((prevData) =>
        prevData.map((row) => (row._id === updatedRow._id ? updatedRow : row))
      );

      toast.success('Data updated successfully!');
      setEdit(false);
      setCurrentRow(null);
      setEditedRow(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error('Unknown error occurred');
      }
    }
  };

  const handleCancelEdit = () => {
    setEdit(false); // Close the modal
    setCurrentRow(null);
    setEditedRow(null); // Reset editedRow
  };
  return (
    <>
      <div
        className='grid-container mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xxl:grid-cols-10 mb-8'
        aria-label='Data Grid'
      >
        {gridData &&
          gridData.map((row, rowIndex) => (
            <div
              className='grid-item  flex justify-end flex-col p-4 mt-8 border rounded-xl relative'
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.45) 11%, 
              rgba(147, 146, 148, 0.45) 62%, rgba(110, 110, 110, 0.5) 78%),
               url(${row.imageUrl || ''})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              key={rowIndex}
            >
              <div className='menu-container absolute top-0 right-0 flex justify-center items-start'>
                <MenuButton
                  row={row as Record<string,string>}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete} />
              </div>

              {memoizedColumns.map((column, colIndex) => {
                return (
                  <div key={colIndex}>
                    {column.accessor !== 'edit' && (
                      <span className='text-white font-extrabold text-2xl mx-auto pb-[0.8rem]'>
                        {`${row[column?.accessor as keyof IGenre] as string}` || '-'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

        <div className=''>{addBox}</div>
        <div className=''>{moreBox}</div>
      </div>

      {isEdit && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className='fixed top-0 left-0 w-full h-full flex  
          items-center justify-center bg-black z-50 bg-opacity-50'
          >
            <div className='bg-white p-6 rounded shadow-lg w-96'>
              <h2 className='text-xl font-bold mb-4'>Edit {label}</h2>

              <div className='form-fields-box flex gap-4'>
                {['name', 'description', 'imageUrl'].map((key) => {
                  if (key === 'imageUrl') {
                    return (
                      <div key={key}>
                        <Label htmlFor='picture'>{key}:</Label>
                        <Input
                          name='imageUrl'
                          type='file'
                          onChange={(e) => {
                            setEditedRow({
                              ...editedRow,
                              [key]: e?.target?.files?.[0],
                            });
                          }}
                          accept='image/png, image/jpeg'
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={key} className='mb-4'>
                      <Label htmlFor={key}>{key}:</Label>
                      <Input
                        type={'text'}
                        name={key}
                        value={editedRow?.[key as keyof IGenre] ? String(editedRow[key as keyof IGenre]) : ''}  // Ensure it's a string
                        onChange={(e) =>
                          setEditedRow({
                            ...editedRow,
                            [key]: e.target.value,
                          })
                        }
                        required={true}
                        className='w-full border border-gray-300 rounded px-3 py-2'
                      />
                    </div>
                  );
                })}
              </div>

              <div className='flex justify-end'>
                <button
                  onClick={handleCancelEdit}
                  className='px-4 py-2 mr-2 bg-gray-300 rounded'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-black rounded'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SmallGrid;
