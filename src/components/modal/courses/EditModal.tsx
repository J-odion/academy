import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };


const EditModal = ({
    title,
    open,
    setOpen,
    className,
  }: ModalProps) => {


    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted with values:", values);
      reset();
    }, 1000);
  };

  const planName = "Some default plan name";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pb-10 sm:rounded-none">
        <DialogTitle
          className={cn(
            `font-bolder  text-center py-10 text-xl text-black`,
            className,
          )}
        >
          {title}
        </DialogTitle>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-20" autoComplete="off">
            <Input
                type="text"
                className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                id="name"
                defaultValue={planName}
                {...register("plan")}
                disabled={isLoading}
              />
            <CustomButton
                type="submit"
                className="w-full bg-[#A85334]"
                disabled={isLoading}
                isLoading={isLoading}
            >
                Save changes
            </CustomButton>
            </form>
        </div>
        </DialogContent>
    </Dialog>
  )
}

export default EditModal
