import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/CustomButton";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useAddAdmin } from "../../../../hooks/tutors";

type TutorsModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddModal = ({ title, open, setOpen, className }: TutorsModalProps) => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: addAdmins, isPending } = useAddAdmin();

  const onSubmit = (data: any) => {
    addAdmins(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-16 sm:rounded-lg">
        <DialogHeader>
          <DialogTitle
            className={cn(
              `font-bolder text-center py-3 text-xl text-black`,
              className
            )}
          >
            {title}
          </DialogTitle>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
              autoComplete="off"
            >
              <div className="mb-2 grid w-full items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                  id="firstName"
                  {...register("firstName")}
                  disabled={isPending}
                />
              </div>
              <div className="mb-2 grid w-full items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                  id="lastName"
                  {...register("lastName")}
                  disabled={isPending}
                />
              </div>
              <div className="mb-2 grid w-full items-center gap-1.5">
                <Label htmlFor="telephone">Phone number</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                  id="telephone"
                  {...register("telephone")}
                  disabled={isPending}
                />
              </div>
              <div className="mb-2 grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="text"
                  className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                  id="email"
                  {...register("email")}
                  disabled={isPending}
                />
              </div>
              <div className="mb-2 grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                  id="password"
                  {...register("password")}
                  disabled={isPending}
                />
              </div>
              <CustomButton className="bg-[#A85334] w-full" type="submit"
              isLoading={isPending}
              disabled={isPending}
              >
                Save
              </CustomButton>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
