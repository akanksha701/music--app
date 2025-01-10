import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@/components/ui/button';
import AddAlbumForm from './AlbumForm';
import { IAlbumDialogProps } from '../types/types';
export default function AlbumDialog({
  openDialog,
  handleCloseDialog,
  selectedSongs,
  formId,
  defaultData
}: IAlbumDialogProps) {
  const handleSubmitForm = () => {
    const form = document.getElementById(formId);
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    }
  };
  return <Dialog open={openDialog} onClose={handleCloseDialog} >
    <div className="flex justify-between gap-4 mx-4 items-center   " >
      <div className="flex  justify-start items-center">
        <DialogTitle>Create Album</DialogTitle>
        <p className="text-xs text-gray-500">{selectedSongs.length} songs </p>
      </div>
      <CloseIcon onClick={handleCloseDialog} className="cursor-pointer mr-4 text-2xl  " ></CloseIcon>

    </div>
    <DialogContent>
      <AddAlbumForm formId={formId} selectedSongs={selectedSongs} handleCloseDialog={handleCloseDialog} defaultData={defaultData} ></AddAlbumForm>
    </DialogContent>
    <DialogActions>
      <div className="flex justify-center sm:justify-start mt-4 flex-wrap mb-4 ms-4" onClick={handleSubmitForm} >
        <Button
          type="submit"
          className="bg-[#9333ea] text-white py-2 px-6 rounded-md shadow-md border-2 border-[#9333ea] hover:bg-white  hover:border-[#9333ea] hover:text-black"
        >
                    Submit
        </Button>


      </div>
    </DialogActions>
  </Dialog>;
}