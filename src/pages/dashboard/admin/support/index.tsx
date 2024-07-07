import React, { useState } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar'
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout'
import { support } from '@/data/data'
import SupportsHeaderTab from '@/components/tabs/admin_dashboard/SupportsHeaderTab'
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button'
import Moment from 'react-moment'
import ViewModal from '@/components/modal/support/ViewModal'
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard'

const Support: NextPageWithLayout = () => {
  const [viewSupport, setViewSupport] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<any>(null);

  const getBackgroundColor = (status: string) => {
    const resolvedColor = 'bg-[#C6E8B3] text-[#5E8D44]';
    const unresolvedColor = 'bg-[#F2CDCD] text-[#BF0E0E]';
    return status === 'resolved' ? resolvedColor : unresolvedColor;
  };


  const handleViewSupport = (support: any) => {
    setSelectedSupport(support);
    setViewSupport(true);
  }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div><h1 className='text-2xl font-medium'>Support</h1></div>
        <SupportsHeaderTab currentTab="all" />
        <div className="py-5 w-full">
          {support.length <= 1 ? (
            <NoDataCard
              img="/images/no-data.png"
              header="No support yet"
              message="You have not received any support yet"
              buttonText="Make a support request"
            />
          ) : (
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {support.map((support) => (
                <TableRow key={support.id}>
                  <TableCell className='text-[#4F4F4F]'>
                    <Moment format="DD/M/YY">
                      {support.date}
                    </Moment>
                  </TableCell>
                  <TableCell className='text-[#4F4F4F]'>{support.email}</TableCell>
                  <TableCell>
                    <div className={`rounded-[6px] capitalize text-center flex justify-center items-center px-4 w-fit h-[2.5em] ${getBackgroundColor(support.status)}`}>
                      {support.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant={'outline'} className='border-[1px] border-[#A85334] text-[#A85334] w-full' onClick={() => handleViewSupport(support)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </div>
      </div>
      <ViewModal title="Support note" open={viewSupport} setOpen={setViewSupport} supportMessage={selectedSupport ? selectedSupport.message : ''} />
    </DashboardSidebar>
  )
}

export default Support

Support.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"support"} >{page}</DashboardLayout>;
};
