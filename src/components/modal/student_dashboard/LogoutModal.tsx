import React from 'react'
import { cn } from '@/lib/utils';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

type ModalProps = {
    className?: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

const LogoutModal = ({title, open, setOpen, className}: ModalProps) => {

    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/login");
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="pb-10 sm:rounded-md bg-[#F0EAE8]">
            <DialogTitle
            className={cn(
                `text-center pb-2 pt-8 text-xl font-medium text-black`,
                className,
            )}
            >
                {title}
            </DialogTitle>
            <div className='flex flex-col justify-center gap-4 mt-8'>
                <Button variant={'outline'} onClick={handleLogout} className='bg-[#A85334] text-white'>Yes, logout</Button>
                <Button onClick={() => setOpen(false)} className='bg-white text-[#A85334] hover:bg-[#A85334]/50 hover:text-white'>Cancel</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default LogoutModal
