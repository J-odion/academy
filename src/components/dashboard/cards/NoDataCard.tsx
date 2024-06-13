import { Button } from '@/components/ui/button';
import React from 'react'

type NoDataCardProps = {
  img?: string;
  header: string;
  message: string;
  buttonText: string;
  link?: string;
  handleClick?: () => void;
};

export const NoDataCard = ({
  img,
  header,
  message,
  buttonText,
  handleClick,
}: NoDataCardProps) => {
  return (
    <div className="shadow-sm rounded-md bg-white py-5">
      <div className="py-10 text-center">
        <div className="flex justify-center pb-4">
          <img src={img} className="w-1/2 md:w-3/12" alt="no account" />
        </div>
        <h2 className="text-2xl">{header}</h2>
        <p className="py-4">{message}</p>
        <Button type="button" onClick={handleClick} className='bg-[#A85334]'>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
