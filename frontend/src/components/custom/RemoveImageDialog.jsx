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
import {FaTerminal as Terminal} from "react-icons/fa6";

export default function RemoveImageDialog({ onConfirm, trigger }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-[linear-gradient(135deg,_rgba(37,42,98,0.85),_rgba(0,0,0,0.65),_rgba(2,2,2,0.75))] backdrop-blur-md border-1 border-white text-white max-w-[400px]">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="flex items-center gap-4 text-white text-base font-normal">
            <Terminal className="h-6 w-6" />
            <h2 className="text-lg">Confirmation message</h2>
          </AlertDialogTitle>

        </AlertDialogHeader>
        <p className="font-light">The image will be removed from local storage and its prediction deleted.</p>
        <AlertDialogFooter className="flex justify-center gap-2 mt-4">
          <AlertDialogAction onClick={handleConfirm} className="bg-[#252b67] hover:bg-[#6c88da]  text-white px-8">
            OK
          </AlertDialogAction>
          <AlertDialogCancel className="bg-transparent border-1 border-white text-white hover:bg-white px-6">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
