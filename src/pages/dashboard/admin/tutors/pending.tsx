import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import TutorsHeaderTab from '@/components/tabs/admin_dashboard/TutorsHeaderTab';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import tutors from '@/data/tutors.json';
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Moment from 'react-moment';
import Datapagination from '@/components/pagination/Data-Pagination';
import AddModal from '@/components/modal/tutors/AddModal';
import { Skeleton } from '@/components/ui/skeleton';
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard';
import { useGetPendingAdmins, useOnboardPendingAdmin } from '../../../../../hooks/account/superAdmin';
import CustomButton from '@/components/CustomButton';

type TutorsProps = {
  firstName: string;
  lastName: string;
  fullName: string;
  adminId: number;
  telephone: string;
  email: string;
  role: string;
  status: string;
  submissionDate: string;
};

const itemsPerPage = 5;

const Pending: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [clientLoaded, setClientLoaded] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<TutorsProps | null>(null);

  const { data: pendingAdmins, isLoading: pendingLoading } = useGetPendingAdmins();
  console.log('Pending Admins:', pendingAdmins);
  const { mutate: onboardPendingAdmin, isPending } = useOnboardPendingAdmin(selectedTutor?.adminId);
  console.log(selectedTutor);

  const handleAddModal = () => setAddModal(!addModal);

  const handleOnboardAdmin = (tutor: TutorsProps) => {
    setSelectedTutor(tutor);
    onboardPendingAdmin();
    setAddModal(false);
  };

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const acceptedTutors = tutors.filter(tutor => tutor.status === 'pending');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingAdmins?.slice(indexOfFirstItem, indexOfLastItem);

  const getButtonBorderColor = (status: string) => {
    return status === 'onboarded' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500';
  };

  if (!clientLoaded || pendingLoading) {
    return (
      <DashboardSidebar>
        <div className="w-full md:mt-20 mt-24">
          <Skeleton className="h-[400px] w-full bg-slate-300 rounded-[6px]" />
        </div>
      </DashboardSidebar>
    );
  }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div className='flex justify-between'>
          <div><h1 className='text-2xl font-medium'>Tutors</h1></div>
          <Button className='bg-[#A85334]  gap-2' onClick={handleAddModal}><Plus size={18} />Add new tutor</Button>
        </div>
        <TutorsHeaderTab currentTab="pending" />
        {pendingAdmins?.length === 0 ? (
            <NoDataCard
              img="/images/no-data.png"
              header="No pending tutors"
              message="You have no pending tutor requests. Click the button below to add a new tutor."
              buttonText="Add new tutor"
              handleClick={handleAddModal}
            />
          ) : (
        <div className="py-5 w-full">
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Telephone</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Date accepted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLoading && (
                  <Skeleton className='h-[400px] bg-slate-300 w-full rounded-[6px]' />
                )}
                {!pendingLoading && currentItems?.map((tutor: TutorsProps, index: React.Key | null | undefined) => (
                  <TableRow key={index}>
                    <TableCell>{tutor.fullName}</TableCell>
                    <TableCell>{tutor.telephone}</TableCell>
                    <TableCell>{tutor.email}</TableCell>
                    <TableCell>
                      <Moment format="DD/M/YY">
                        {tutor.submissionDate}
                      </Moment>
                    </TableCell>
                    <TableCell>
                      <CustomButton
                        variant={'outline'}
                        className={getButtonBorderColor(tutor.status)}
                        onClick={() => handleOnboardAdmin(tutor)}
                        isLoading={isPending}
                        disabled={isPending}
                      >
                        {tutor.status === 'onboarded' ? 'Reject request' : 'Accept request'}
                      </CustomButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
        )}
      </div>
      <Datapagination
        totalItems={pendingAdmins?.length}
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
  );
};

export default Pending;

Pending.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"tutors"}>{page}</DashboardLayout>;
};
