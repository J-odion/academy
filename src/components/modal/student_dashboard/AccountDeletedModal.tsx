import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/router";
import verify from "/public/images/verify.svg";
import Image from "next/image";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AccountDeletedModal = ({ open, setOpen }: ModalProps) => {
  const router = useRouter();

  const handleOkay = () => {
    setOpen(false);
    router.push("/auth/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-14 sm:rounded-[8px]">
        <DialogHeader>
          <DialogTitle
            className={` font-medium flex flex-col items-center justify-center text-center text-xl`}
          >
            <Image
              src={verify}
              alt="verify"
              width={82}
              height={82}
              className="mb-6"
            />
            <p className="font-medium text-2xl">Account deleted</p>
          </DialogTitle>
          <p className="pb-14 text-[15px] text-center">
            We have now permanently deleted your user account. We are sorry to
            see you leave. You are always welcome to join Spice city again!
          </p>
          <Button className="bg-[#A85334] mt-8" onClick={handleOkay}>
            Okay
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDeletedModal;
