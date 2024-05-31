import React, { useState } from 'react';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';


type Course = {
    id: number;
    title: string;
    no_of_lessons: number;
    price: number;
}

type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedCourse: Course;
};

const CourseDetailsModal = ({
    title,
    open,
    setOpen,
    className,
    selectedCourse
}: ModalProps) => {

    if (!selectedCourse) {
        return null;
    }

    const formatToNigerianCurrency = (price: number) => {
        const formatter = new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
        });
        return formatter.format(price);
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-14 sm:rounded-[8px]">
            <DialogHeader>
                <DialogTitle
                        className={` font-medium flex items-center justify-center text-center pb-5 text-xl ${className}`}
                    >
                    {title}
                </DialogTitle>
                <div className='py-14'>
                    <ul className='flex flex-col gap-4'>
                        <li className='flex justify-between'><span className='text-[#1E1E1E80] font-normal text-base'>Course title: </span><span>{selectedCourse.title}</span></li>
                        <li className='flex justify-between'><span className='text-[#1E1E1E80] font-normal text-base'>Number of lessons: </span><span>{selectedCourse.no_of_lessons}</span></li>
                        <li className='flex justify-between'><span className='text-[#1E1E1E80] font-normal text-base'>Amount: </span><span className='font-bold text-xl text-[#D06B0D]'>{formatToNigerianCurrency(selectedCourse.price)}</span></li>

                    </ul>
                </div>
                <Button className='bg-[#A85334] hover:bg-[#A85334]/50'>
                    Proceed to payment methods
                </Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CourseDetailsModal
