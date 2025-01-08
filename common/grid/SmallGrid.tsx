"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IGridrops } from "../types/types";
import "./SmallGrid.css";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { useDeleteGenreMutation, useUpdateGenreMutation } from "@/services/genre";
import { useDeleteLanguageMutation, useUpdateLanguageMutation } from "@/services/languages";
import MenuButton from "../buttons/PopoverButton";
 


const SmallGrid = ({ 
  columns,
  data,  
  label,
  moreBox,
  addBox
}: IGridrops) => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const [gridData, setGridData] = useState(data);
 
  const [isEdit, setEdit] = useState(false);
  const [menuVisibleRow, setMenuVisibleRow] = useState<string | null>(null);
  const [currentRow, setCurrentRow] = useState<any>(null); // To store the row being edited
  const [editedRow, setEditedRow] = useState<any>({}); // To track edits
 
  const handleEdit = useCallback((rowData: any) => {
    setEdit(true); // Show the edit modal
    setCurrentRow(rowData); // Set the current row data
    setEditedRow(rowData); // Initialize edited data with the current row
    setMenuVisibleRow(null);
  }, []);

  useEffect(() => {
    setGridData(data)
  } , [data])

  const handleDelete = async (id: any) => {
    let res;

    try {
      if (label === "language") {
        res = await deleteLanguage({ id })
      } else {
        res = await deleteGenre({ id })
      }

      toast.success("Data deleted successfully!");
      setGridData((prevData) =>
        prevData.filter((row) => row._id !== id)
      );

    } catch (error) {
      toast.error("Error deleting data");
    }

  }

  const handleMenuToggle = (rowId: string) => {
    setMenuVisibleRow((prev) => (prev === rowId ? null : rowId));
  };
  const memoizedColumns = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      className: column.className || "",
    }));
  }, [columns]);
  const [updateGenre] = useUpdateGenreMutation()
  const [updateLanguage] = useUpdateLanguageMutation()
  const [deleteLanguage] = useDeleteLanguageMutation()
  const [deleteGenre] = useDeleteGenreMutation()

  const onSubmit = async () => {

    try {


      const formData = new FormData();
      formData.append('img', editedRow.imageUrl); // Ensure editedRow.imageUrl is a File object or Blob

      // Optionally append other data fields
      Object.keys(editedRow).forEach(key => {
        if (key !== 'imageUrl') {
          formData.append(key, editedRow[key]); // Append other fields
        }
      });

      // ========== 
      let res;
      if (label === "language") {
        res = await updateLanguage({
          id: currentRow._id,
          data: formData,
        })
      } else {
        res = await updateGenre({
          id: currentRow._id,
          data: formData,
        })
      }



      const updatedRow = res.data.data;

      // Update the gridData without setting undefined values
      setGridData((prevData) =>
        prevData.map((row) => (row._id === updatedRow._id ? updatedRow : row))
      );

      toast.success("Data updated successfully!");
      setEdit(false); // Close the modal
      setCurrentRow(null);
      setEditedRow({});
    } catch (error) {
      toast.error("Error updating data");
      console.error("Error updating data:", error);
    }


  };

  const handleCancelEdit = () => {
    setEdit(false); // Close the modal
    setCurrentRow(null);
    setEditedRow({});
  };
 


  return (
    <>
      <div
        className="grid-container mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xxl:grid-cols-10 mb-8"
        aria-label="Data Grid"
      >
        {gridData && gridData.map((row, rowIndex) => (
          <div
            className="grid-item  flex justify-end flex-col p-4 mt-8 border rounded-xl   relative"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.45) 11%, rgba(147, 146, 148, 0.45) 62%, rgba(110, 110, 110, 0.5) 78%), url(${row.imageUrl || '/genres/images/default.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            key={rowIndex}
          >

            <div className="menu-container absolute top-0 right-0 flex justify-center items-start">


              <MenuButton row={row}
                handleMenuToggle={handleMenuToggle}
                handleEdit={handleEdit}
                handleDelete={handleDelete}></MenuButton>

            </div>


            {memoizedColumns.map((column, colIndex) => {

              return (
                <div key={colIndex}>


                  {column.accessor !== "edit" && (
                    <span className="text-white font-extrabold text-2xl mx-auto pb-[0.8rem]">
                      {`${row[column.accessor]}` || "-"}

                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div className=""

        >{addBox}</div>
        <div

          className="">{moreBox}</div>



      </div>


      {isEdit && (

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fixed top-0 left-0 w-full h-full flex  items-center justify-center bg-black z-50 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit {label}</h2>

              <div className="form-fields-box flex gap-4">
                {["name", "description", "imageUrl"].map((key) => {

                  {
                    if (key === "imageUrl") {
                      return (
                        <div key={key} >
                          <Label htmlFor="picture">{key}:</Label>

                          <Input
                            name="imageUrl"
                            type="file"
                            onChange={(e) => {

                              setEditedRow({ ...editedRow, [key]: e.target.files![0] })

                            }
                            }
                            accept="image/png, image/jpeg"
                          />
                        </div>
                      );
                    }
                  }
                  return (
                    <div key={key}>
                      <div key={key} className="mb-4">
                        <Label htmlFor="picture">{key}:</Label>
                        <Input
                          type={"text"}
                          name={key}
                          value={editedRow[key] || ""}
                          onChange={(e) =>
                            setEditedRow({ ...editedRow, [key]: e.target.value })
                          }
                          required={true}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                      </div>
                    </div>

                  )
                })}
              </div>



              <div className="flex justify-end">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 mr-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"

                  className="px-4 py-2 bg-blue-500 text-black rounded"
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
