import React, { useState, useEffect } from 'react';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

type ModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  editSubscriptionPlan?: any;
  isPending?: boolean;
  selectedPlan: {
    _id: number;
    name: string;
    price: number;
    peak1: string;
    peak2: string;
    peak3: string;
  };
};

const EditModal = ({
  title,
  open,
  setOpen,
  editSubscriptionPlan,
  isPending,
  className,
  selectedPlan,
}: ModalProps) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (selectedPlan) {
      setValue("name", selectedPlan.name);
      setValue("price", selectedPlan.price);
      setValue("peak1", selectedPlan.peak1);
      setValue("peak2", selectedPlan.peak2);
      setValue("peak3", selectedPlan.peak3);
    }
  }, [selectedPlan, setValue]);

  const onSubmit = async (values: any) => {
    editSubscriptionPlan({
      ...values
    });
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-10 sm:rounded-none">
        <DialogHeader>
          <DialogTitle className={`font-bold flex items-center text-center pb-5 text-xl ${className}`}>
            {title}
          </DialogTitle>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
              <div className="mb-3 grid w-full items-center gap-1.5">
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                  id="name"
                  {...register("name")}
                  disabled={isPending}
                />
              </div>
              <div className="mb-3 grid w-full items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF]"
                  id="price"
                  {...register("price")}
                  disabled={isPending}
                />
              </div>
              {[1, 2, 3].map((index) => (
                <div key={index} className="mb-3 grid w-full items-center gap-1.5">
                  <Label htmlFor={`peak${index}`}>Perk {index} (Max of 32 characters)</Label>
                  <Input
                    type="text"
                    className="py-5 bg-[#F2E9DF]"
                    {...register(`peak${index}`)}
                    disabled={isPending}
                  />
                </div>
              ))}
              <CustomButton
                type="submit"
                className="w-full bg-[#A85334] hover:bg-[#A85334]/50 focus-visible:outline-none"
                disabled={isPending}
                isLoading={isPending}
              >
                Save Changes
              </CustomButton>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
