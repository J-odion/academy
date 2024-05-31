import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/CustomButton";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Image, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type FreeCoursesModalProps = {
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
}: FreeCoursesModalProps) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitStep1 = async (data: any) => {
    setStep(2);
  };

  const onSubmitStep2 = async (data: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted with values:", data);
      reset();
      setStep(1);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-4 sm:rounded-lg">
        <DialogHeader>
          <DialogTitle
            className={cn(
              `font-bolder  text-center py-3 text-xl text-black`,
              className
            )}
          >
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-black pb-4">Step {step} of 2 </DialogDescription>
          <div>
            <form
              onSubmit={
                step === 1
                  ? handleSubmit(onSubmitStep1)
                  : handleSubmit(onSubmitStep2)
              }
              className="space-y-8"
              autoComplete="off"
            >
              {step === 1 && (
                <>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="course_title">Course Title</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="course_title"
                      {...register("course_title")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="course_order">Course order</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="course_order"
                      {...register("course_order")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="video_link">Video link</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="video_link"
                      {...register("video_link")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="description"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid grid-cols-2  gap-4">
                    <Button className="bg-[#F0EAE8] gap-4 text-[#1E1E1E]">
                      <span>
                        <Image size={18} className="text-[#D1831F]" />
                      </span>
                      Change video thumbnail
                    </Button>
                    <Button className="bg-[#F0EAE8] gap-4 text-[#1E1E1E]">
                      <span>
                        <Image size={18} className="text-[#D1831F]" />
                      </span>
                      Change templature
                    </Button>

                    <Button className="bg-[#F0EAE8] gap-4 text-[#1E1E1E]">
                      <span>
                        <Mic size={18} className="text-[#D1831F]" />
                      </span>
                      Change loop
                    </Button>
                    <Button className="bg-[#F0EAE8] gap-4 text-[#1E1E1E]">
                      <span>
                        <Mic size={18} className="text-[#D1831F]" />
                      </span>
                      Change audio
                    </Button>
                  </div>
                  <CustomButton className="w-full bg-[#A85334]">
                    Next
                  </CustomButton>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="assignment_one">
                      Assignment question 1
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignment_one"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="assignment_two">
                      Assignment question 2
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignment_two"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="assignment_three">
                      Assignment question 3
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignment_three"
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="flex justify-between gap-4">
                    <CustomButton
                    variant={'outline'}
                    className="text-[#A85334] border-[#A85334] w-full"
                    onClick={() => setStep(1)}
                    >
                    Previous
                    </CustomButton>
                    <CustomButton className="bg-[#A85334] w-full" type="submit">
                    Save Changes
                    </CustomButton>
                </div>
                )}

            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
