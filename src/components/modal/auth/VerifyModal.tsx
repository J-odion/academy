import React from 'react'
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import verify from '/public/images/verify.svg';
import Image from 'next/image';

type ModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const VerifyModal = ({open, setOpen}: ModalProps) => {
    const router = useRouter();
    const role = localStorage.getItem('role');
    // const accountId = localStorage.getItem('accountId');


    const handleOkay = () => {
        setOpen(false);
        if (role === 'admin' || role === 'superadmin') {
          router.push(`/auth/login/adminLogin`);
        } else {
          router.push('/auth/login');
        }
      }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-14 sm:rounded-[8px]">
            <DialogHeader>
                <DialogTitle
                    className={` font-medium flex flex-col items-center justify-center text-center text-xl`}
                >
                    <Image src={verify} alt="verify" width={82} height={82} className='mb-6'/>
                    <p className='font-medium text-2xl'>Account Verified</p>
                </DialogTitle>
                <p className='pb-14 text-[15px] text-center'>Click okay to login to your newly created account</p>
                <Button className="bg-[#A85334] mt-8" onClick={handleOkay}>Okay</Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default VerifyModal
