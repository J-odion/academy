import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';


type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };


const ChangePasswordModal = ({title, open, setOpen, className}: ModalProps) => {

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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pb-10 sm:rounded-md bg-[#F0EAE8]">
            <DialogTitle
            className={cn(
                `font-medium text-center py-4 text-xl text-black`,
                className,
            )}
            >
                {title}
            </DialogTitle>
            <div>
                <form className='flex flex-col space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="old-password">Enter old password</Label>
                        <Input
                            type="password"
                            className="py-5 bg-white outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                            id="old-password"
                            {...register("old-password")}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Label htmlFor="new-password">Enter new password</Label>
                        <Input
                            type="password"
                            className="py-5 bg-white outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                            id="new-password"
                            {...register("new-password")}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirm-password">Confirm new password</Label>
                        <Input
                            type="password"
                            className="py-5 bg-white outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                            id="confirm-password"
                            {...register("confirm-password")}
                            disabled={isLoading}
                        />
                    </div>

                    <CustomButton
                        type="submit"
                        className="w-full bg-[#A85334]"
                        disabled={isLoading}
                        isLoading={isLoading}
                    > Change password </CustomButton>
                </form>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal
