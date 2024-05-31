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
import { Textarea } from "@/components/ui/textarea";
import { useAddFreeCourses } from "../../../../../hooks/account/admin";
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
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedVideoThumbnail, setSelectedVideoThumbnail] = useState<File | null>(null);
  const [selectedTemplature, setSelectedTemplature] = useState<File | null>(null);
  const [selectedLoop, setSelectedLoop] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);

  const { mutate, isPending } = useAddFreeCourses();
  const { toast } = useToast();

  const onSubmitStep1 = async (data: any) => {
    setStep(2);
  };

  const onSubmitStep2 = async (data: any) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("course_title", data.course_title);
    formData.append("course_order", data.course_order);
    formData.append("video_link", data.video_link);
    formData.append("description", data.description);
    formData.append("assignment_one", data.assignment_one);
    formData.append("assignment_two", data.assignment_two);
    formData.append("assignment_three", data.assignment_three);

    if (selectedVideoThumbnail) {
      formData.append("video_thumbnail", selectedVideoThumbnail);
    }
    if (selectedTemplature) {
      formData.append("templature", selectedTemplature);
    }
    if (selectedLoop) {
      formData.append("loop", selectedLoop);
    }
    if (selectedAudio) {
      formData.append("audio", selectedAudio);
    }

    const dataObject = {
      course_title: data.course_title,
      course_order: data.course_order,
      video_link: data.video_link,
      description: data.description,
      assignment_one: data.assignment_one,
      assignment_two: data.assignment_two,
      assignment_three: data.assignment_three,
      video_thumbnail: selectedVideoThumbnail?.name || null,
      templature: selectedTemplature?.name || null,
      loop: selectedLoop?.name || null,
      audio: selectedAudio?.name || null,
    };

    Object.entries(dataObject).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    console.log(dataObject);
    mutate(formData, {
      onSuccess: (res) => {
        if (res.status_code === 201 || res.status_code === 200) {
          setOpen(false);
        }
      },
      onError: (error) => {
        console.error("Error submitting form: ", error);
        toast({
          title: "Error",
          description: "An error occurred, please try again",
          variant: "destructive",
        });
        setIsLoading(false);
      },
    });
    // setTimeout(() => {
    //   setIsLoading(false);
    //   reset();
    //   setOpen(false);
    // }, 1000);
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
                      {...register("description")}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-4 items-center bg-[#F0EAE8] py-3">
                        <Label
                          htmlFor="video_thumbnail"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span>
                            <Image size={18} className="text-[#D1831F]" />
                          </span>
                          Change video thumbnail
                          <input
                            type="file"
                            id="video_thumbnail"
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
                          htmlFor="templature"
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <span>
                            <Image size={18} className="text-[#D1831F]" />
                          </span>
                          Change templature
                          <input
                            type="file"
                            id="templature"
                            className="hidden"
                            onChange={(e) => handleSelectedFile(e, setSelectedTemplature)}
                          />
                        </Label>
                      </div>
                      {selectedTemplature && (
                        <span className="text-[#1E1E1E]">
                          {selectedTemplature.name}
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
                    <Label htmlFor="assignment_one">
                      Assignment question 1
                    </Label>
                    <Textarea
                      className="py-5 bg-[#F2E9DF] outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-[#F2E9DF] focus:ring-[#A85334]"
                      id="assignment_one"
                      {...register("assignment_one")}
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
                      {...register("assignment_two")}
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
                      {...register("assignment_three")}
                      disabled={isLoading}
                    />
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
                  <CustomButton className="bg-[#A85334] w-full" type="submit">
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
