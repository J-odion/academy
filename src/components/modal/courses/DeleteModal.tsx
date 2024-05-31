import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";


type ModalProps = {
    className?: string;
    title: string;
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

const DeleteModal = ({
    title,
    open,
    message,
    setOpen,
    className,
  }: ModalProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pb-10 sm:rounded-none">
        <DialogTitle
          className={cn(
            `font-bolder  text-center pt-10 text-xl text-black`,
            className,
          )}
        >
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm text-center pb-4 text-black">
          {message}
        </DialogDescription>
        <div className="flex flex-col gap-6 justify-center">
          <CustomButton
            className="bg-[#A85334] text-white"
            onClick={() => setOpen(false)}
          >
            Yes, delete
          </CustomButton>
          <CustomButton
            className="bg-[#F2E9DF] text-[#A85334] lg:ml-0 ml-4"
            onClick={() => setOpen(false)}
          >
            Cancel
          </CustomButton>
        </div>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
