import React, { useState, useEffect } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import AssignmentsHeaderTab from '@/components/tabs/admin_dashboard/AssignmentsHeaderTab';
import assignments from '@/data/assignments.json';
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Moment from 'react-moment';
import Datapagination from '@/components/pagination/Data-Pagination';
import { useGetAllReviewedAssignments } from '../../../../../hooks/account/superAdmin';
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard';
import { Skeleton } from '@/components/ui/skeleton';

type TeacherResponse = {
  assignment1TutorGrade: string;
  assignment2TutorGrade: string;
  assignment3TutorGrade: string;
  assignment1TutorRemark: string;
  assignment2TutorRemark: string;
  assignment3TutorRemark: string;
}

type AssignmentsProps = {
  _id: string;
  assignmentStudentSubmissionDate: string;
  studentId: string;
  studentEmail: string;
  teacherResponse: TeacherResponse;
  status: string;
  assignmentTutorReviewDate: string;
  createdAt: string;
  updatedAt: string;
}

const itemsPerPage = 8;

const Assignments: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clientLoaded, setClientLoaded] = useState(false);
  const { data: assignmentsData, isLoading } = useGetAllReviewedAssignments();
  console.log(assignmentsData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assignmentsData?.slice(indexOfFirstItem, indexOfLastItem);

  const getBackgroundColor = (grade: number) => {
    if (grade >= 80 && grade <= 100) {
      return 'bg-[#D6F3C5] ';
    } else if (grade >= 60 && grade <= 79) {
      return 'bg-orange-200';
    } else {
      return 'bg-red-200';
    }
  };

  function handleAddModal(): void {
    throw new Error('Function not implemented.');
  }

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

  return (
    <DashboardSidebar>
      <div className="w-full md:mt-20 mt-24">
        <div><h1 className='text-2xl font-medium'>Assignments</h1></div>
        <AssignmentsHeaderTab currentTab="received" />
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
                {!isLoading && currentItems?.filter((assignment: { status: string; }) => assignment?.status === 'reviewed').map((assignment: AssignmentsProps) => (
                  <TableRow key={assignment?._id}>
                    <TableCell className='text-[#4F4F4F]'>
                      <Moment format="D/M/YY">
                        {assignment.assignmentStudentSubmissionDate}
                      </Moment>
                    </TableCell>
                    <TableCell>assignmentName</TableCell>
                    <TableCell>{assignment?.studentEmail}</TableCell>
                    <TableCell>assignmentLevel</TableCell>
                    <TableCell>assignmentLesson</TableCell>
                    <TableCell>
                      <div className={`rounded-[6px] capitalize text-center flex justify-center items-center p-[13px] h-[2.5em] ${getBackgroundColor(Number(assignment?.teacherResponse?.assignment1TutorGrade))}`}>
                        {assignment?.teacherResponse?.assignment1TutorGrade}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant={'outline'} className='border-[1px] border-[#A85334] text-[#A85334]'>
                        {assignment?.status === 'reviewed' ? 'View Remark' : 'Grade'}
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
        totalItems={assignmentsData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </DashboardSidebar>
  );
};

export default Assignments;

Assignments.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"assignments"}>{page}</DashboardLayout>;
};
