import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function RemoveImageDialog({ onConfirm, trigger }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-[#1a1b26] border border-[#2A2C3F] text-white max-w-[400px]">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-white text-base font-normal">
            Are you sure you want to remove this image and its predictions?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-2 mt-4">
          <AlertDialogAction onClick={handleConfirm} className="bg-[#4353ff] hover:bg-[#3a47e0] text-white px-8">
            OK
          </AlertDialogAction>
          <AlertDialogCancel className="bg-transparent border border-[#2A2C3F] text-white hover:bg-[#2A2C3F] px-6">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
