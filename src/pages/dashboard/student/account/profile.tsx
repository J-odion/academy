import React, {useState} from 'react'
import DashboardLayout from '@/components/layout/students_dashboard/DashboardLayout'
import DashboardSidebar from '@/components/layout/students_dashboard/DashboardSidebar'
import { NextPageWithLayout } from '@/pages/_app'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'
import ChangePasswordModal from '@/components/modal/student_dashboard/ChangePasswordModal'
import DeleteAccountModal from '@/components/modal/student_dashboard/DeleteAccountModal'
import AccountDeletedModal from '@/components/modal/student_dashboard/AccountDeletedModal'

const Profile: NextPageWithLayout = () => {

    const [open, setOpen] = useState(false);
    const [openDeletedModal, setOpenDeletedModal] = useState(false)
    const [openDelete, setOpenDelete] = useState(false);


    const handleChangePasswordModal = () => {
        setOpen(!open);
    }

    const handleDeleteAccountModal = () => {
        setOpenDelete(!openDelete);
    }

  return (
    <DashboardSidebar>
      <div className="w-full mt-20 md:mt-20 px-6" >
        <div className='flex justify-between'>
        <h1 className='font-medium text-2xl mb-8'>Profile</h1>
        <Button variant={'link'} className='text-[#A85334]' onClick={handleDeleteAccountModal}>Delete account</Button>
        </div>
        <div className='flex flex-col space-y-6 md:space-y-16'>

          <div className='flex items-center gap-[27px]'>
            <div className="md:w-44 md:h-44 w-28 h-28 ">
              <Avatar className='w-full h-full rounded-[37px] md:rounded-[56px]'>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className='md:ml-8 flex flex-col gap-2'>
              <h1 className='text-lg md:text-xl'>Olagunju Micheal</h1>
              <p className='text-sm md:text-base'>oreoluwa@gmail.com</p>
            </div>
          </div>

          <div className="md:w-2/3 w-full">
            <Accordion type="single" collapsible className="space-y-4 md:space-y-6">
              <AccordionItem value="item-1" className='bg-[#FDF4E9] border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='font-normal text-sm'>Change name</AccordionTrigger>
                <AccordionContent>
                  Olagunju Micheal
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className='bg-[#FDF4E9] border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='font-normal text-sm'>Change username</AccordionTrigger>
                <AccordionContent>
                  Micheal79
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className='bg-[#FDF4E9] border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='font-normal text-sm'>Change profile image</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className='bg-[#FDF4E9] border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6'>
                <AccordionTrigger className='font-normal text-sm'>Change email address</AccordionTrigger>
                <AccordionContent>
                  oreoluwa@gmail.com
                </AccordionContent>
              </AccordionItem>

              <div  className='border-[1px] border-[#C4AAA1] rounded-md pr-4 pl-6 flex justify-between items-center h-[3.1em] cursor-pointer' onClick={handleChangePasswordModal}>
                <p className='font-normal text-sm'>Change password</p>
                <ChevronRight size={14} className='text-[#D06B0D]' />
                {/* <AccordionTrigger className='font-normal text-sm'>Change password</AccordionTrigger>
                <AccordionContent>
                  Ola3457
                </AccordionContent> */}
              </div>

            </Accordion>

            <Button className='mt-6 bg-[#A85334]'>Save Changes</Button>
          </div>
        </div>
      </div>
        <ChangePasswordModal open={open} setOpen={setOpen} title='Change Password' />
        <DeleteAccountModal open={openDelete} setOpen={setOpenDelete} title='Are you sure you want to delete your account' />
        <AccountDeletedModal open={openDeletedModal} setOpen={setOpenDeletedModal} />
    </DashboardSidebar>
  )
}

export default Profile

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"dashboard"}>{page}</DashboardLayout>
}
