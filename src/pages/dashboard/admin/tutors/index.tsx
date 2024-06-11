import React, { useState } from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar'
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout'
import TutorsHeaderTab from '@/components/tabs/admin_dashboard/TutorsHeaderTab'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import tutors from '@/data/tutors.json'
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Moment from 'react-moment';
import Datapagination from '@/components/pagination/Data-Pagination';
import AddModal from '@/components/modal/tutors/AddModal'
import { useGetPendingAdmins, useOnboardPendingAdmin, useOnboardedAdmins } from '../../../../../hooks/tutors'


const itemsPerPage = 5;

const Tutors: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState<boolean>(false);

  const { data: pendingAdmins, error: pendingError, isLoading: pendingLoading } = useGetPendingAdmins();
  console.log('Pending Admins:', pendingAdmins);

  const { data: onboardedAdmins, error: onboardedError, isLoading: onboardedLoading } = useOnboardedAdmins();
  console.log('Onboarded Admins:', onboardedAdmins);

  const acceptedTutors = tutors.filter(tutor => tutor.status === 'accepted');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = acceptedTutors.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddModal = () => setAddModal(!addModal);

  const getButtonBorderColor = (status: string) => {
    return status === 'accepted' ? 'border-red-500 text-red-500' : 'border-green-500 text-red-500';
  };

  // if (pendingLoading || onboardedLoading) return <div>Loading...</div>;
  // if (pendingError || onboardedError) return <div>Error loading data</div>;

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div className='flex justify-between'>
          <div><h1 className='text-2xl font-medium'>Tutors</h1></div>
          <Button className='bg-[#A85334]  gap-2' onClick={handleAddModal}><Plus size={18} />Add Tutors</Button>
        </div>
        <TutorsHeaderTab currentTab="accepted" />
        <div className="py-5 w-full">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Telephone</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Date accepted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((tutor, index) => (
                <TableRow key={index}>
                  <TableCell>{tutor.name}</TableCell>
                  <TableCell>{tutor.telephone}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>
                    <Moment format="DD/M/YY">
                      {tutor.date_accepted}
                    </Moment>
                  </TableCell>
                  <TableCell>
                    <Button variant={'outline'} className={getButtonBorderColor(tutor.status)}>
                      {tutor.status === 'accepted' ? 'Reject request' : 'Accept request'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>
      </div>
      <Datapagination
            totalItems={tutors.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
      <AddModal
       title="Add Tutor"
       open={addModal}
       setOpen={setAddModal}
      />
    </DashboardSidebar>
  )
}

export default Tutors

Tutors.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"tutors"} >{page}</DashboardLayout>;
};
