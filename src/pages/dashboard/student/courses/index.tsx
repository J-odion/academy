import React from 'react'
import DashboardSidebar from '@/components/layout/students_dashboard/DashboardSidebar'
import DashboardLayout from '@/components/layout/students_dashboard/DashboardLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { Button } from '@/components/ui/button'
import CoursesHeaderTab from '@/components/tabs/student_dashboard/CoursesHeaderTab'

const Courses: NextPageWithLayout = () => {
  return (
    <DashboardSidebar>
        <div className="w-full mt-20 md:mt-20">
            <div className='flex justify-between'>
                <h1>Purchased courses</h1>
                <Button>Buy course</Button>
            </div>
            <CoursesHeaderTab currentTab='all'/>

        </div>
    </DashboardSidebar>
  )
}

export default Courses

Courses.getLayout = function getLayout(page: React.ReactElement){
    return <DashboardLayout page={"courses"}>{page}</DashboardLayout>
}
