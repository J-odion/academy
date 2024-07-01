import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import { NextPageWithLayout } from '@/pages/_app';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStorage } from '@/lib/useStorage';
import { useChangeEmail, useChangeName, useChangePassword, useChangeProfilePicture } from '../../../../../hooks/profile';
import CustomButton from '@/components/CustomButton';

const Profile: NextPageWithLayout = () => {
  const { mutate: changeName, isPending } = useChangeName();
  const { mutate: changeEmail } = useChangeEmail();
  const { mutate: changePassword } = useChangePassword();
  const { mutate: changeProfilePicture } = useChangeProfilePicture();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const fullName = useStorage.getItem('firstName') + ' ' + useStorage.getItem('lastName');
  const email = useStorage.getItem('email');

  const handleSaveChanges = () => {
    if (newName) {
      changeName({ name: newName });
    }

    if (newEmail) {
      changeEmail({ email: newEmail });
    }

    if (newPassword) {
      changePassword({ password: newPassword });
    }

    if (profilePicture) {
      const formData = new FormData();
      formData.append('file', profilePicture);

      changeProfilePicture(formData);
    }
  };

  return (
    <DashboardSidebar>
      <div className="w-full mt-20 md:mt-20 px-6">
        <h1 className='font-medium text-2xl mb-8'>Profile</h1>
        <div className='flex flex-col space-y-6 md:space-y-16'>
          <div className='flex items-center gap-[27px]'>
            <div className="md:w-44 md:h-44 w-28 h-28">
              <Avatar className='w-full h-full rounded-[37px] md:rounded-[56px]'>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='md:ml-8 flex flex-col gap-2'>
              {fullName ? <h1 className='text-lg md:text-2xl font-bold'>{fullName}</h1> : <h1 className='text-lg md:text-2xl font-bold'>John doe</h1>}
              {email ? <p className='text-sm md:text-base text-[#A85334]'>{email}</p> : <p className='text-sm md:text-base text-[#A85334]'>johndoe@example.com</p>}
            </div>
          </div>

          <div className="md:w-2/3 w-full">
            <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
              <AccordionItem value="item-1" className='bg-[#F0EAE8] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='text-[#D06B0D] font-normal text-sm'>Change name</AccordionTrigger>
                <AccordionContent>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter new name"
                    className="mb-4"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className='bg-[#F0EAE8] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='text-[#D06B0D] font-normal text-sm'>Change profile image</AccordionTrigger>
                <AccordionContent>
                  <Input
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                    className="mb-4"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className='bg-[#F0EAE8] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='text-[#D06B0D] font-normal text-sm'>Change email address</AccordionTrigger>
                <AccordionContent>
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email"
                    className="mb-4"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className='bg-[#F0EAE8] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='text-[#D06B0D] font-normal text-sm'>Change password</AccordionTrigger>
                <AccordionContent>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mb-4"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <CustomButton
              className='mt-6 bg-[#A85334]'
              onClick={handleSaveChanges}
              isLoading={isPending}
              disabled={isPending}
              >
                Save Changes
            </CustomButton>
          </div>
        </div>
      </div>
    </DashboardSidebar>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"dashboard"}>{page}</DashboardLayout>;
};
