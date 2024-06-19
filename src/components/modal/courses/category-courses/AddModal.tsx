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
import { useAuth } from "../../../../../context/auth.context";

type FreeCoursesModalProps = {
  className?: string;
  title: string;
  open: boolean;
  addCategory: any;
  isPending?: boolean;
  setOpen: (open: boolean) => void;
};

const AddModal = ({
  title,
  open,
  setOpen,
  addCategory,
  isPending,
  className,
}: FreeCoursesModalProps) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedVideoThumbnail, setSelectedVideoThumbnail] = useState<File | null>(null);
  const [selectedTablature, setSelectedTablature] = useState<File | null>(null);
  const [selectedLoop, setSelectedLoop] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);

  // const { mutate, isPending } = useAddCategory();
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

    // mutate(formData, {
    //   onSuccess: (res) => {
    //     toast({
    //       title: "Free course added",
    //       description: `${res.message}`,
    //       variant: "default",
    //     });
    //     setIsLoading(false);
    //     reset();
    //     setOpen(false);
    //   },
    //   onError: (error) => {
    //     console.error("Error submitting form: ", error);
    //     toast({
    //       title: "Error",
    //       description: "An error occurred, please try again",
    //       variant: "destructive",
    //     });
    //     setIsLoading(false);
    //   },
    // });

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
          <DialogDescription className="text-center text-black pb-4">
            Step {step} of 2
          </DialogDescription>
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
                    <Label htmlFor="courseOrder">Course order</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="courseOrder"
                      {...register("courseOrder")}
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
                    <Label htmlFor="videoLink">Video link</Label>
                    <Input
                      type="text"
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="videoLink"
                      {...register("videoLink")}
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
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-4 items-center bg-[#F0EAE8] py-3">
                        <Label
                          htmlFor="videoThumbnail"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span>
                            <Image size={18} className="text-[#D1831F]" />
                          </span>
                          Change video thumbnail
                          <input
                            type="file"
                            id="videoThumbnail"
                            className="hidden"
                            onChange={(e) => handleSelectedFile(e, setSelectedVideoThumbnail)}
                          />
                        </Label>
                      </div>
                      {selectedVideoThumbnail && (
                        <span className="text-[#1E1E1E]">
                          {selectedVideoThumbnail.name}
                        </span>
                      )}

                      <div className="flex gap-4 items-center bg-[#F0EAE8] py-3">
                        <Label
                          htmlFor="tablature"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span>
                            <Image size={18} className="text-[#D1831F]" />
                          </span>
                          Change tablature
                          <input
                            type="file"
                            id="tablature"
                            className="hidden"
                            onChange={(e) => handleSelectedFile(e, setSelectedTablature)}
                          />
                        </Label>
                      </div>
                      {selectedTablature && (
                        <span className="text-[#1E1E1E]">
                          {selectedTablature.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-4 items-center bg-[#F0EAE8] py-3">
                        <Label
                          htmlFor="loop"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span>
                            <Mic size={18} className="text-[#D1831F]" />
                          </span>
                          Change loop
                          <input
                            type="file"
                            id="loop"
                            className="hidden"
                            onChange={(e) => handleSelectedFile(e, setSelectedLoop)}
                          />
                        </Label>
                      </div>
                      {selectedLoop && (
                        <span className="text-[#1E1E1E]">
                          {selectedLoop.name}
                        </span>
                      )}

                      <div className="flex gap-4 items-center bg-[#F0EAE8] py-3">
                        <Label
                          htmlFor="audio"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span>
                            <Mic size={18} className="text-[#D1831F]" />
                          </span>
                          Change audio
                          <input
                            type="file"
                            id="audio"
                            className="hidden"
                            onChange={(e) => handleSelectedFile(e, setSelectedAudio)}
                          />
                        </Label>
                      </div>
                      {selectedAudio && (
                        <span className="text-[#1E1E1E]">
                          {selectedAudio.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <CustomButton className="w-full bg-[#A85334]">
                    Next
                  </CustomButton>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="assignmentQuestion1">
                      Assignment question 1
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignmentQuestion1"
                      {...register("assignmentQuestion1")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="assignmentQuestion2">
                      Assignment question 2
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignmentQuestion2"
                      {...register("assignmentQuestion2")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="assignmentQuestion3">
                      Assignment question 3
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignmentQuestion3"
                      {...register("assignmentQuestion3")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3 grid w-full items-center gap-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setValue('category', value)} defaultValue="" >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course category" />
                        </SelectTrigger>
                        <SelectContent id="category">
                            <SelectItem value="amateur">Amateur</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="flex justify-between gap-4">
                  <CustomButton
                    variant={"outline"}
                    className="text-[#A85334] border-[#A85334] w-full"
                    onClick={() => setStep(1)}
                  >
                    Previous
                  </CustomButton>
                  <CustomButton className="bg-[#A85334] w-full" type="submit"
                  disabled={isLoading}
                  isLoading={isPending}
                  >
                    Save
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

export default AddModal;
