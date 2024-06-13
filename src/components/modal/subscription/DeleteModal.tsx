import React from 'react';
import { cn } from '@/lib/utils';
import CustomButton from "@/components/CustomButton";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Loader2Icon } from 'lucide-react';

type ModalProps = {
  className?: string;
  title: string;
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  deleteSubscriptionPlan?: () => void;
  isPending: any;
};

const DeleteModal = ({
  title,
  open,
  message,
  setOpen,
  deleteSubscriptionPlan,
  className,
  isPending,
}: ModalProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-10 sm:rounded-none">
        <DialogHeader>
          <DialogTitle
            className={cn(
              `font-bolder text-center pt-10 text-xl text-black`,
              className,
            )}
          >
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-center pb-4 text-black">
            {message}
          </DialogDescription>
          <div className="flex flex-col gap-6 justify-center">
            <CustomButton
              className="bg-[#A85334] text-white"
              onClick={deleteSubscriptionPlan}
              disabled={isPending}
              isLoading={isPending}
            >
              {isPending ? (<Loader2Icon size={20} />) : "Yes, delete"}
            </CustomButton>
            <CustomButton
              className="bg-[#F2E9DF] text-[#A85334] lg:ml-0 ml-4"
              onClick={() => setOpen(false)}
            >
              Cancel
            </CustomButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
