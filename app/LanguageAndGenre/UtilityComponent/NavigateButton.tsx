"use client"
import AddGenre from "@/app/LanguageAndGenre/UtilityComponent/AddGenre";
import AddLanguage from "@/app/LanguageAndGenre/UtilityComponent/AddLanguage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link"
import { useState } from "react";

export const SeeMoreButton = ({url}  : {
  url : string
}) => {
  return (<>
    <Link href={url}>
    <div
  className="grid-item flex flex-col justify-end p-4 mt-8 border rounded-xl relative font-bold bg-white text-black bg-[url('/images/eye.png')] bg-[length:50px] bg-center bg-no-repeat"
>
  See more
</div>

    </Link>
  </>)
}

export const AddMoreButton = ({label} : {
  label : string
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="grid-item  flex justify-end flex-col p-4 mt-8 border font-bold rounded-xl  relative text-black self-center" onClick={handleOpenDialog}
            style={{
              backgroundColor: "white",
              backgroundImage: `url('/images/add.png')`,
              backgroundSize: '50px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            Add More
          </Button>
        </DialogTrigger>

        {isDialogOpen && (
          <DialogContent className="max-w-lg w-full bg-transparent border-none rounded-lg text-transparent">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Add {label}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 rounded-lg bg-transparent">
              {
                label === "genre" ? <AddGenre handleCloseDialog={handleCloseDialog} /> : 
                <AddLanguage handleCloseDialog={handleCloseDialog} />
              }
              
            </div>
          </DialogContent>
        )}
      </Dialog>

    </div>
  );
};
 