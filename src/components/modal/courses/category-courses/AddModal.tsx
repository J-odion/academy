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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Image, Loader2Icon, Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useAddCategory } from "../../../../../hooks/account/admin";
import { useToast } from "@/components/ui/use-toast";

type FreeCoursesModalProps = {
  className?: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddModal = ({
  title,
  open,
  setOpen,
  className,
}: FreeCoursesModalProps) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isPending } = useAddCategory();

  const [selectedVideoThumbnail, setSelectedVideoThumbnail] = useState<File | null>(null);
  const [selectedTablature, setSelectedTablature] = useState<File | null>(null);
  const [selectedLoop, setSelectedLoop] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);


  const { toast } = useToast();

  const onSubmitStep1 = async (data: any) => {
    setStep(2);
  };

  const onSubmitStep2 = async (data: any) => {
    setIsLoading(true);
    let dataObject: { [key: string]: any } = {
      courseTitle: data.courseTitle,
      courseOrder: Number(data.courseOrder),
      coursePrice: Number(data.coursePrice),
      videoLink: data.videoLink,
      description: data.description,
      assignmentQuestion1: data.assignmentQuestion1,
      assignmentQuestion2: data.assignmentQuestion2,
      assignmentQuestion3: data.assignmentQuestion3,
      tablature: selectedTablature?.name || null,
      videoThumbnail: selectedVideoThumbnail?.name || null,
      audio: selectedAudio?.name || null,
      loop: selectedLoop?.name || null,
      category: data.category,
    };

    let formData = new FormData();
      for (let key in dataObject) {
        if (dataObject[key] !== null) {
          formData.append(key, dataObject[key]);
        }
      }
    console.log(dataObject);

    mutate(formData, {
      onSuccess: (res) => {
        toast({
          title: "Free course added",
          description: `${res.message}`,
          variant: "default",
        });
        setIsLoading(false);
        reset();
        setOpen(false);
      },
      onError: (error) => {
        console.log("Error submitting form: ", error);
        toast({
          title: "Error",
          description: "An error occurred, please try again",
          variant: "destructive",
        });
        setIsLoading(false);
      },
    });

  };

  const handleSelectedFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-4 sm:rounded-lg">
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
              onSubmit={
                step === 1
                  ? handleSubmit(onSubmitStep1)
                  : handleSubmit(onSubmitStep2)
              }
              className="space-y-8"
              autoComplete="off"
            >
              
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="courseTitle">Course Title</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="courseTitle"
                      {...register("courseTitle")}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="coursePrice">Course Price</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="coursePrice"
                      {...register("coursePrice")}
                      disabled={isLoading}
                    />
                  </div>
                 
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="description"
                      {...register("description")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    
                  </div>               

                <div className="flex justify-between gap-4">
                  
                  <CustomButton className="bg-[#A85334] w-full" type="submit"
                    disabled={isPending}
                    isLoading={isPending}
                  >
                    Save
                  </CustomButton>
                </div>
              
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
