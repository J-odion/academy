import { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import CoursesCategoryTab from '@/components/tabs/admin_dashboard/CoursesCategoryTab';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';



const Advanced = () => {

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20">
        <div className="items-center justify-between md:flex">
          <Button variant={'link'} className='text-[#A85334]' onClick={handleGoBack}>Back</Button>
          <Button className='bg-[#A85334]'><span><Plus size={14} /></span>{" "}Add course</Button>
        </div>
        <CoursesCategoryTab currentTab={'advanced'} />
          <h1>Advanced Courses</h1>

      </div>
    </DashboardSidebar>
  )
}

export default Advanced

Advanced.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"courses"} >{page}</DashboardLayout>;
};
