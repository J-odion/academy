import React, { useState } from 'react';
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
  const price = "price";

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
            <div className="mb-3 grid w-full items-center gap-1.5">
              <Label htmlFor="account_name">Account Name</Label>
              <Input
                type="text"
                className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                id="name"
                defaultValue={planName}
                {...register("plan")}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3 grid w-full items-center gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                type="text"
                className="py-5 bg-[#F2E9DF]"
                id="price"
                defaultValue={price}
                {...register("price")}
                disabled={isLoading}
              />
            </div>
            {[1, 2, 3].map((index) => (
              <div key={index} className="mb-3 grid w-full items-center gap-1.5">
                <Label htmlFor={`perk${index}`}>Perk {index} (Max of 32 characters)</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF]"
                  {...register(`perk${index}`)}
                  disabled={isLoading}
                />
              </div>
            ))}
            <CustomButton
              type="submit"
              className="w-full bg-[#A85334] hover:bg-[#A85334]/50 focus-visible:outline-none"
              disabled={isLoading}
              isLoading={isLoading}
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
