import React, { useState, useEffect } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import AssignmentsHeaderTab from '@/components/tabs/admin_dashboard/AssignmentsHeaderTab';
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Moment from 'react-moment';
import Datapagination from '@/components/pagination/Data-Pagination';
import GradeModal from '@/components/modal/assignments/GradeModal';
import { useGetAllPendingAssignments } from '../../../../../hooks/account/superAdmin';
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard';
import { Skeleton } from '@/components/ui/skeleton';


type AssignmentsProps = {
  _id: string;
  studentId: string;
  studentEmail: string;
  studentName: string;
  tutorId: string;
  assignmentQuestion1: string;
  assignmentQuestion2: string;
  assignmentQuestion3: string;
  assignment1StudentRemark: string;
  assignment2StudentRemark: string;
  assignment3StudentRemark: string;
  status: string;
  assignmentId: string;
  assignmentStudentSubmissionDate: string;
}

const itemsPerPage = 8;

const Pending: NextPageWithLayout = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentsProps | null>(null);
  const [viewAssignment, setViewAssignment] = useState(false);
  const [clientLoaded, setClientLoaded] = useState(false);

  const { data: assignmentsData, isLoading } = useGetAllPendingAssignments();
  console.log(assignmentsData);

  const handleViewAssignment = (assignment: AssignmentsProps) => {
    setSelectedAssignment(assignment);
    setViewAssignment(true);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assignmentsData?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setClientLoaded(true);
  }, []);

  if (!clientLoaded || isLoading) {
    return (
      <DashboardSidebar>
        <div className="w-full md:mt-20 mt-24">
          <Skeleton className="h-[400px] w-full bg-slate-300 rounded-[6px]" />
        </div>
      </DashboardSidebar>
    );
  }

  function handleAddModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div><h1 className='text-2xl font-medium'>Assignments</h1></div>
        <AssignmentsHeaderTab currentTab="pending" />
        {assignmentsData?.length === 0 ? (
          <NoDataCard
            img="/images/no-data.png"
            header="No assignments yet"
            message="You have not received any assignments yet. Click the button below to add a new assignment."
            buttonText="Add new assignment"
            handleClick={handleAddModal}
          />
        ) : (
        <div className="py-4 w-full">
          <Table className='w-full'>
            <TableHeader>
              <TableRow>
                <TableHead>Submission date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Lesson</TableHead>
                <TableHead>Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading && currentItems?.filter((assignment: { status: string; }) => assignment.status === 'pending').map((assignment: AssignmentsProps) => (
                <TableRow key={assignment?._id}>
                  <TableCell className='text-[#4F4F4F]'>
                    <Moment format="D/M/YY">
                      {assignment?.assignmentStudentSubmissionDate}
                    </Moment>
                  </TableCell>
                  <TableCell>{assignment?.studentName}</TableCell>
                  <TableCell>{assignment?.studentEmail}</TableCell>
                  <TableCell>assignmentLevel</TableCell>
                  <TableCell>assignmentLesson</TableCell>
                  <TableCell>
                    <Button variant={'outline'} className='border-[1px] border-[#A85334] text-[#A85334]' onClick={()  => handleViewAssignment(assignment)}>
                      {assignment.status === 'reviewed' ? 'View Remark' : 'Grade'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        )}
      </div>
      <Datapagination
        totalItems={assignmentsData?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {selectedAssignment && (
        <GradeModal
          open={viewAssignment}
          setOpen={setViewAssignment}
          assignments={selectedAssignment}
        />
      )}
    </DashboardSidebar>
  );
};

export default Pending;

Pending.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"assignments"}>{page}</DashboardLayout>;
};
