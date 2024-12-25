import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export function MenuButton({ row, handleMenuToggle, handleEdit, handleDelete }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="text-black p-2 bg-white rounded-lg menu-btn"
            onClick={() => handleMenuToggle(row._id)}
          >
            <BiDotsVerticalRounded />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1 bg-white shadow-md rounded-lg scale-75"
          side="bottom"
          align="start"
          sideOffset={8}
          alignOffset={8}
        >
          <ul className="flex gap-1 ">
            <IconButton aria-label="update" size="small"><FaEdit onClick={() => {
              handleEdit(row)
              setOpen(false)
            }}

            /></IconButton>

            <IconButton aria-label="delete" size="small" >
              <DeleteIcon fontSize="small" onClick={
                () => {
                  handleDelete(row._id)
                  setOpen(false)
                }
              } />
            </IconButton>


          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MenuButton;