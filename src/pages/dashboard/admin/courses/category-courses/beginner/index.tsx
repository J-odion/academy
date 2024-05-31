import { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import CoursesCategoryTab from '@/components/tabs/admin_dashboard/CoursesCategoryTab';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import categories from '@/data/categories.json';


const Beginner: NextPageWithLayout = () => {
  const router = useRouter();

  const formatToNigerianCurrency = (price: number) => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    return formatter.format(price);
  };

  const handleGoBack = () => {
    router.back();
  }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div className="items-center flex justify-between md:flex">
          <Button variant={'link'} className='text-[#A85334]' onClick={handleGoBack}>Back</Button>
          <Button className='bg-[#A85334]'><span><Plus size={14} /></span>{" "}Add course</Button>
        </div>
        <CoursesCategoryTab currentTab={'beginner'} />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {categories.map((category) => (
            <div key={category.id} className='flex flex-col gap-2 px-4 rounded-[6px] justify-between py-4 border-[1px] border-[#E5E5E5]'>
              <div className='flex items-center gap-4'>
                <video className='rounded-md w-full' controls>
                  <source src={category.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <h5>{category.title}</h5>
              {/* <div className='text-[#A85334] bg-[#F0EAE8] px-1 text-sm py-2 w-full md:w-[50%]'>{category.name_of_tutor}</div> */}
              <div className="flex justify-between">
                <p>{category.no_of_lessons}{" "}lessons</p>
                <h4 className='text-[#A85334]'>{formatToNigerianCurrency(category.price)}</h4>
              </div>
              <div className="flex justify-between gap-6 mt-6">
                <Button variant={'outline'} className='border-[1px] border-[#A85334] text-[#A85334] w-full'>View</Button>
                <Button className='bg-[#A85334] rounded-[5px] w-full'>Edit</Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardSidebar>
  )
}

export default Beginner

Beginner.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"courses"} >{page}</DashboardLayout>;
};
