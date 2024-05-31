import React, { useState } from 'react';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import Moment from 'react-moment';



type Student = {
    id: number;
    name: string;
    email: string;
    date_joined: string;
    subscription_plan: string;
    last_purchase: string;
};


type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedStudent: Student;
};

const DetailsModal = ({
    title,
    open,
    setOpen,
    className,
    selectedStudent,
}: ModalProps) => {

    if (!selectedStudent) {
        return null;
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-14 sm:rounded-[8px]">
            <DialogHeader>
                <DialogTitle
                    className={` font-medium flex items-center justify-center text-center pb-5 text-xl ${className}`}
                >
                    {selectedStudent.name}
                </DialogTitle>
                <div>
                    <ul className='flex flex-col gap-4'>
                        <li className='flex gap-12'><span className='text-[#1E1E1E80] font-normal text-base'>Date joined: </span><span><Moment format='MMM Do, YYYY'>{selectedStudent.date_joined}</Moment></span></li>
                        <li className='flex gap-8'><span className='text-[#1E1E1E80] font-normal text-base'>Email address: </span><span>{selectedStudent.email}</span></li>
                        <li className='flex gap-2'><span className='text-[#1E1E1E80] font-normal text-base'>Subscription plan: </span><span className='uppercase'>{selectedStudent.subscription_plan} plan</span></li>
                        <li className='flex gap-8'><span className='text-[#1E1E1E80] font-normal text-base'>Last purchase: </span><span><Moment format='MMM Do, YYYY'>{selectedStudent.last_purchase}</Moment></span></li>
                    </ul>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DetailsModal
