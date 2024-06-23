import { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import CoursesCategoryTab from '@/components/tabs/admin_dashboard/CoursesCategoryTab';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';


const Amateur = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }
  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div className="items-center flex justify-between md:flex">
          <Button variant={'link'} className='text-[#A85334] sm:text-md text-lg' onClick={handleGoBack}>Back</Button>
          <Button className='bg-[#A85334] sm:text-md text-lg'><span><Plus size={18} /></span>{" "}Add course</Button>
        </div>
        <CoursesCategoryTab currentTab={'amateur'} />
          <h1>Amateur Courses</h1>

      </div>
    </DashboardSidebar>
  )
}

export default Amateur

Amateur.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"courses"} >{page}</DashboardLayout>;
};
