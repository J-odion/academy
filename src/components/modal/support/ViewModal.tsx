import React, { useState } from 'react';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Textarea } from '@/components/ui/textarea';

type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    supportMessage: string;
};

const ViewModal = ({
    title,
    open,
    setOpen,
    className,
    supportMessage,
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="pb-10 sm:rounded-none">
                <DialogHeader>
                    <DialogTitle
                        className={`font-bold flex items-center text-center pb-5 text-xl ${className}`}
                    >
                        {title}
                    </DialogTitle>
                    <div>
                        <div className='bg-[#1E1E1E0D] rounded-lg py-6 px-4 mb-4'>
                            <p>{supportMessage}</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
                            <Label>Response</Label>
                            <Textarea placeholder="Type your response here" className='bg-[#F2E9DF]' />

                            <div className='flex justify-between gap-4'>
                                <CustomButton
                                    type="submit"
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                    variant={'outline'}
                                    className="w-full text-[#A85334] border-[#A85334]"
                                >
                                    Send
                                </CustomButton>
                                <CustomButton
                                    type="submit"
                                    isLoading={isLoading}
                                    className="w-full bg-[#A85334]"
                                >
                                    Resolve
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ViewModal;
