import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { useChangeProfilePicture } from '../../../../hooks/profile';

type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
};

const ChangeProfilePictureModal = ({ title, open, setOpen, className }: ModalProps) => {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const { mutate: changeProfilePicture, isPending } = useChangeProfilePicture();

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
            setProfilePicture(file);
        } else {
            alert('Please select a valid image file (jpeg, jpg, png, gif).');
        }
    };

    const onSubmit = (values: any) => {
        const formData = new FormData();
        if (profilePicture !== null) {
            formData.append('profilePicture', profilePicture);
        }
        setIsLoading(true);
        changeProfilePicture(
            formData,
            {
                onSuccess: () => {
                    setIsLoading(false);
                    console.log("Profile picture changed successfully");
                    reset();
                    setOpen(false);
                },
                onError: (error: any) => {
                    setIsLoading(false);
                    console.error("Error changing profile picture:", error);
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
                            <Label htmlFor="profilePicture">Select a picture</Label>
                            <Input
                                type="file"
                                accept="image/jpeg, image/jpg, image/png, image/gif"
                                onChange={handleProfilePictureChange}
                                disabled={isPending}
                            />
                        </div>

                        <CustomButton
                            type="submit"
                            className="w-full bg-[#A85334]"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            Change profile picture
                        </CustomButton>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeProfilePictureModal;
