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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge"


type ModalProps = {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  assignments: any;
};

type Assignment = {
  id: number;
  answer: string;
};

const GradeModal = ({
  open,
  setOpen,
  className,
  assignments,
}: ModalProps) => {
  const [step, setStep] = useState(1);
  const [textAreas, setTextAreas] = useState<string[]>([]);
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

  const handleAddText = () => {
    setTextAreas([...textAreas, ""]);
  };

  const handleRemoveText = (index: number) => {
    const newTextAreaList = [...textAreas];
    newTextAreaList.splice(index, 1);
    setTextAreas(newTextAreaList);
  };

  // const assignment1 = assignments.assignments.find((assignment: { id: number; }) => assignment.id === 1);
  // const assignment2 = assignments.assignments.find((assignment: { id: number; }) => assignment.id === 2);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-10 sm:rounded-none max-w-screen-md">
        <DialogHeader>
          <DialogTitle
            className={`font-bold flex items-center text-center pb-5 text-xl ${className}`}
          ></DialogTitle>
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
                <div>
                  <div className="flex justify-between mt-4">
                    <div>
                      {/* Assignment {title.map((assignment: any) => assignment.id[0])} */}
                      Assignment 1
                    </div>
                    <div className="bg-[#F2E9DF] px-8 py-2 rounded-[8px]">Grade: {assignments.grade} %</div>
                  </div>
                  <p>A question that involves explanation</p>
                  <div className="bg-[#1E1E1E0D] rounded-lg py-6 px-4 mb-4">
                    <p>
                        {assignments?.assignment1StudentRemark}
                    </p>
                  </div>
                </div>
                <div className="mb-10">
                  <h2>Remark</h2>
                  {textAreas.map((textArea, index) => (
                    <div key={index} className="flex gap-3 pt-6 mb-4 relative">
                      <Textarea
                        className="w-full placeholder:border-[1px] placeholder:border-[#F2E9DF]"
                        value={textArea}
                        onChange={(e) => {
                          const newTextAreas = [...textAreas];
                          newTextAreas[index] = e.target.value;
                          setTextAreas(newTextAreas);
                        }}
                        // placeholder={`Order ${index + 1}`}

                      />
                      <Badge variant={'outline'} className="absolute left-0 border-[#C4AAA1] rounded-[6px] my-3 ml-2">{`Order ${index + 1}`}</Badge>
                      <Button
                        className="bg-white text-[#A85334] border-[1px] border-[#A85334] h-8 w-9 my-3 mr-2 absolute right-0"
                        onClick={() => handleRemoveText(index)}
                      >
                        --
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-6 mb-10">
                  <Button
                    className="bg-[#FDF4E9] border-[1px] border-[#A85334] text-[#A85334] hover:bg-[#A85334]/50"
                    onClick={handleAddText}
                  >
                    <Plus size={18} />
                    Add text
                  </Button>
                    <Button className="bg-[#FDF4E9] border-[1px] border-[#A85334] text-[#A85334] hover:bg-[#A85334]/50">
                      <Plus size={18} />
                      Add Video
                    </Button>
                    <Button className="bg-[#FDF4E9] border-[1px] border-[#A85334] text-[#A85334] hover:bg-[#A85334]/50">
                      <Plus size={18} />
                      Add Audio
                    </Button>
                  </div>

                </div>
                <CustomButton className="w-1/3 bg-[#A85334]">
                  Next
                </CustomButton>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <div className="flex justify-between mt-4">
                    <div>
                      {/* Assignment {title.map((assignment: any) => assignment.id)} */}
                      Assignment 2
                    </div>
                    <div>Grade: {assignments.grade} %</div>
                  </div>
                  <p>A question that involves explanation</p>
                  <div className="bg-[#1E1E1E0D] rounded-lg py-6 px-4 mb-4">
                    <p>
                      {assignments?.assignment2StudentRemark}
                    </p>
                  </div>
                </div>
                <div className="mb-10">
                  <h2>Remark</h2>
                  {textAreas.map((textArea, index) => (
                    <div key={index} className="flex gap-3 pt-6 mb-4 relative">
                      <Textarea
                        className="w-full"
                        value={textArea}
                        onChange={(e) => {
                          const newTextAreas = [...textAreas];
                          newTextAreas[index] = e.target.value;
                          setTextAreas(newTextAreas);
                        }}
                        placeholder={`Order ${index + 1}`}
                      />
                      <Badge variant={'outline'} className="absolute left-0 border-[#C4AAA1] rounded-[6px] my-3 ml-2">{`Order ${index + 1}`}</Badge>
                      <Button
                        className="bg-white text-[#A85334] border-[1px] border-[#A85334] h-8 w-9 my-3 mr-2 absolute right-0"
                        onClick={() => handleRemoveText(index)}
                      >
                        --
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-6 mb-10">
                  <Button
                    className="bg-[#FDF4E9] border-[1px] border-[#A85334] text-[#A85334] hover:bg-[#A85334]/50"
                    onClick={handleAddText}
                  >
                    <Plus size={18} />
                    Add text
                  </Button>
                    <Button className="bg-[#FDF4E9] border-[1px] border-[#A85334] text-[#A85334] hover:bg-[#A85334]/50">
                      <Plus size={18} />
                      Add Video
                    </Button>
                    <Button className="bg-[#FDF4E9] border-[1px] border-[#A85334] text-[#A85334] hover:bg-[#A85334]/50">
                      <Plus size={18} />
                      Add Audio
                    </Button>
                  </div>

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
                  Save Changes
                </CustomButton>
              </div>
            )}
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GradeModal;
