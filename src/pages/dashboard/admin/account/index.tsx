import { useState } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardSidebar from "@/components/layout/admin_dashboard/DashboardSidebar";
import DashboardLayout from "@/components/layout/admin_dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Moment from "react-moment";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { data } from "@/components/layout/admin_dashboard/Cards";
import { BookOpen, Plus } from "lucide-react";
import { requests, transactions, support } from "@/data/data";
import { useRouter } from "next/router";
import { useStorage } from "@/lib/useStorage";
import {
  useGetPendingAdmins,
  useDeleteAdmin,
  useOnboardPendingAdmin,
} from "../../../../../hooks/account/superAdmin";
import AddModal from "@/components/modal/tutors/AddModal";


type TutorRequestProps = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  adminId: string;
  submissionDate: string;
};

const Dashboard: NextPageWithLayout = () => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showAllTutorialRequests, setShowAllTutorialRequests] = useState(false);
  const [showAllSupport, setShowAllSupport] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<TutorRequestProps | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: getAdminData, isLoading } = useGetPendingAdmins();
  console.log(getAdminData);
  const { mutate: deleteAdmin } = useDeleteAdmin(selectedAdmin?.adminId);
  const { mutate: onboardAdmin } = useOnboardPendingAdmin(
    selectedAdmin?.adminId
  );

  const router = useRouter();
  const refresh = useStorage.getItem("refresh-token");
  console.log(refresh);


  const handleAddTutor = () => {
    setShowAddModal(true);
  }
  const handleDeleteAdmin = (admin: TutorRequestProps) => {
    setSelectedAdmin(admin);
    deleteAdmin();
  };

  const handleOnboardAdmin = (admin: TutorRequestProps) => {
    setSelectedAdmin(admin);
    onboardAdmin();
  };

  const recentTransactions = showAllTransactions
    ? transactions
    : transactions.slice(0, 4);
  const tutorRequests = showAllTutorialRequests
    ? getAdminData
    : getAdminData?.slice(0, 4);
  const supports = showAllSupport ? support : support.slice(0, 4);

  const toggleShowTransactions = () => {
    setShowAllTransactions((prev) => !prev);
  };

  const toggleShowTutorialRequests = () => {
    setShowAllTutorialRequests((prev) => !prev);
  };

  const toggleShowSupport = () => {
    setShowAllSupport((prev) => !prev);
  };

  return (
    <DashboardSidebar>
      <div className="w-full mt-20 md:mt-20">
        <div className="items-center justify-between md:flex gap-10">
          <div className="flex flex-col">
            <div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col w-full h-[250px] p-4 rounded-lg shadow-md relative overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    <Image
                      src="/images/blob.svg"
                      alt="dashboard"
                      width={150}
                      height={100}
                      className="absolute -top-3 right-0"
                    />
                    <div className="flex flex-col flex-grow justify-center items-center gap-4">
                      <div className="w-8 h-8">
                        <BookOpen size={20} />
                      </div>
                      <h6 className="text-2xl text-center md:text-xl font-semibold">{item.text}</h6>
                      <h1 className="text-4xl text-center md:text-4xl font-semibold">{item.value}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {!isLoading ? (
                <div className="my-8 bg-[#FEF9F8] p-8 border-[#C4AAA1] border-2 rounded-md">
                  <div className="flex justify-between items-center">
                    <p className="sm:text-md text-2xl">Recent transactions</p>
                    <Button
                      variant={"link"}
                      className="text-[#A85334]  text-2xl md:text-lg"
                      // onClick={toggleShowTransactions}
                      onClick={() => router.push("/dashboard/admin/transactions")}
                    >
                      {/* {showAllTransactions ? "View less" : "View all"} */}
                      View all
                    </Button>
                  </div>
                  <Table>
                    <TableBody>
                      {recentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.receiptNo}</TableCell>
                          <TableCell>{transaction.plan}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>
                            <Moment format="DD/M/YY">
                              {transaction.created_at}
                            </Moment>
                          </TableCell>
                          <TableCell>
                            <Select>
                              <SelectTrigger className="border-2 border-[#F8DEBD] rounded-md">
                                <SelectValue
                                  placeholder={`${transaction.status}`}
                                  className={
                                    transaction.status === "Success"
                                      ? "placeholder:text-[#E1B57C]"
                                      : "placeholder:text-red-500"
                                  }
                                ></SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <Skeleton className="w-8 h-8 mr-4 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div>
              <Button className="bg-[#A85334] w-full items-center sm:text-md text-lg" onClick={handleAddTutor}>
                <Plus size={18} /> Add tutor
              </Button>
            </div>

            <div className="mt-8 bg-[#FEF9F8] p-8 border-[#C4AAA1] border-2 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-2xl md:text-lg">Tutor Requests</p>
                <Button
                  variant={"link"}
                  className="text-[#A85334]  text-2xl md:text-lg"
                  // onClick={toggleShowTutorialRequests}
                  onClick={() => router.push("/dashboard/admin/tutors")}
                >
                  {/* {showAllTutorialRequests ? "View less" : "View all"} */}
                  View All
                </Button>
              </div>
              <Table>
                <TableBody>
                  {tutorRequests?.map((request: TutorRequestProps) => (
                    <TableRow key={request?._id}>
                      <TableCell>{request?.firstName}{' '}{request?.lastName}</TableCell>
                      <TableCell>{request?.email}</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="border-2 border-[#F8DEBD] rounded-md">
                            <SelectValue
                              placeholder={`${request?.status}`}
                              className={
                                request?.status === "Accept"
                                  ? "placeholder:text-[#E1B57C]"
                                  : "placeholder:text-red-500"
                              }
                            ></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="accept"
                              onClick={() => handleOnboardAdmin(request)}
                            >
                              Accept
                            </SelectItem>
                            <SelectItem
                              value="reject"
                              onClick={() => handleDeleteAdmin(request)}
                            >
                              Reject
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <div className="mt-8 bg-[#FEF9F8] p-8 border-[#C4AAA1] border-2 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-2xl md:text-lg">Support</p>
                  <Button
                    variant={"link"}
                    className="text-[#A85334] text-2xl md:text-lg"
                    onClick={() => router.push("/dashboard/admin/")}
                  >
                    {/* {showAllSupport ? "View less" : "View all"} */}
                    View all
                  </Button>
                </div>
                <Table>
                  <TableBody>
                    {supports.map((support) => (
                      <TableRow key={support.id}>
                        <TableCell>{support.name}</TableCell>
                        <TableCell>{support.email}</TableCell>
                        <TableCell>
                          <Button
                            className="border-[#A85334] text-[#A85334]"
                            variant={"outline"}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddModal title="Add tutors" open={showAddModal} setOpen={() => setShowAddModal(false)} />
    </DashboardSidebar>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"dashboard"}>{page}</DashboardLayout>;
};
