import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { useChangeName } from '../../../../hooks/profile';

type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const ChangeNameModal = ({ title, open, setOpen, className }: ModalProps) => {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate: changeName, isPending } = useChangeName();

    const onSubmit = (values: any) => {
        setIsLoading(true);
        changeName(
            { firstName: values['firstName'], lastName: values['lastName'] },
            {
                onSuccess: () => {
                    setIsLoading(false);
                    console.log("Name changed successfully");
                    reset();
                    setOpen(false);
                },
                onError: (error: any) => {
                    setIsLoading(false);
                    console.error("Error changing password:", error);
                }
            }
        );
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
                            <Label htmlFor="firstName">Enter first name</Label>
                            <Input
                                type="firstName"
                                className="py-5 bg-white outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                                id="firstName"
                                {...register("firstName")}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Enter last name</Label>
                            <Input
                                type="lastName"
                                className="py-5 bg-white outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                                id="lastName"
                                {...register("lastName")}
                                disabled={isLoading}
                            />
                        </div>

                        <CustomButton
                            type="submit"
                            className="w-full bg-[#A85334]"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            Change name
                        </CustomButton>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeNameModal;
