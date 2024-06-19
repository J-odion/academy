import React, { useState } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import DashboardSidebar from '@/components/layout/admin_dashboard/DashboardSidebar';
import DashboardLayout from '@/components/layout/admin_dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import EditModal from '@/components/modal/subscription/EditModal';
import AddModal from '@/components/modal/subscription/AddModal';
import DeleteModal from '@/components/modal/subscription/DeleteModal';
import { useGetSubscriptionPlans, useDeleteSubscriptionPlan, useUpdateSubscriptionPlan } from '../../../../../hooks/subscriptions';
import { Skeleton } from '@/components/ui/skeleton';
import { NoDataCard } from '@/components/dashboard/cards/NoDataCard';

type SubscriptionPlansProps = {
  _id: number;
  name: string;
  price: number;
  peak1: string;
  peak2: string;
  peak3: string;
  subscriptionPlanId: string;
};

const SubscriptionPlans: NextPageWithLayout = () => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlansProps | null>(null);

  const { data: subscriptionPlans, isLoading } = useGetSubscriptionPlans();
  const { mutate: deleteSubscriptionPlan, isPending } = useDeleteSubscriptionPlan(selectedPlan?.subscriptionPlanId);
  const { mutate: updateSubscriptionPlan, isPending: pendingUpdate } = useUpdateSubscriptionPlan(selectedPlan?.subscriptionPlanId);
  console.log(selectedPlan?.subscriptionPlanId)

  const handleAddModal = () => setAddModal(!addModal);

  const handleDeleteModal = (plan: SubscriptionPlansProps) => {
    setSelectedPlan(plan);
    setDeleteModal(!deleteModal);
  };

  const handleEditModal = (plan: SubscriptionPlansProps) => {
    setSelectedPlan(plan);
    setEditModal(!editModal);
  };

  return (
    <DashboardSidebar>
      <div className="w-full pt-10 px-8">
        <div className="flex justify-between align-middle items-center">
          <div>
            <h1 className="text-2xl font-semibold py-8">Subscription Plans</h1>
          </div>
          <Button className="bg-[#A85334] gap-2" onClick={handleAddModal}>
            <Plus size={18} /> Add Subscription
          </Button>
        </div>

        {subscriptionPlans?.length === 0 ? (
          <NoDataCard
            img="/images/no-data.png"
            header="No subscription plans available"
            message="You have not added any subscription plans yet. Click the button below to add a new subscription plan."
            buttonText="Add subscription plan"
            handleClick={handleAddModal}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {isLoading && (
              <>
                <Skeleton className='h-[400px] bg-slate-300 w-full rounded-[6px]' />
                <Skeleton className='h-[400px] bg-slate-300 w-full rounded-[6px]' />
                <Skeleton className='h-[400px] bg-slate-300 w-full rounded-[6px]' />
                <Skeleton className='h-[400px] bg-slate-300 w-full rounded-[6px]' />
              </>
            )}

            {!isLoading && subscriptionPlans?.map((plan: SubscriptionPlansProps) => (
              <div key={plan._id} className="bg-white shadow-md p-4 rounded-md border-brown flex flex-col gap-4 border-2 relative">
                <img src='/images/blob-music-purple.svg' alt="music" className="absolute top-0 right-0 w-[220px] h-[220px] overflow-hidden" />
                <p className="text-medium font-md text-[#895543] uppercase">{plan?.name} plan</p>
                <h2 className="font-bold text-2xl mt-2 text-[#D06B0D]">₦{plan?.price}</h2>
                <ul className="my-8 flex flex-col gap-4">
                  <li className="text-gray-500 text-sm inline-flex items-center gap-6">
                    <span><img src="/images/guitar.svg" alt="guitar" /></span>
                    {plan?.peak1}
                  </li>
                  <li className="text-gray-500 text-sm inline-flex items-center gap-6">
                    <span><img src="/images/guitar.svg" alt="guitar" /></span>
                    {plan?.peak2}
                  </li>
                  <li className="text-gray-500 text-sm inline-flex items-center gap-6">
                    <span><img src="/images/guitar.svg" alt="guitar" /></span>
                    {plan?.peak3}
                  </li>
                </ul>
                <div className="mt-4 flex justify-between items-center">
                  <Button className='bg-[#A85334] w-full' onClick={() => handleEditModal(plan)}>Edit</Button>
                  <Button variant="link" className="ml-2" onClick={() => handleDeleteModal(plan)}>
                    <Trash size={20} color='#A85334' className='' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPlan && (
        <EditModal
          title='Edit plan'
          open={editModal}
          setOpen={setEditModal}
          editSubscriptionPlan={updateSubscriptionPlan}
          isPending={pendingUpdate}
          selectedPlan={selectedPlan}
        />
      )}

      <AddModal
        title='Add plan'
        open={addModal}
        setOpen={setAddModal}
      />
      {selectedPlan && (
        <DeleteModal
          title='Delete course'
          message='This action cannot be reversed'
          open={deleteModal}
          setOpen={setDeleteModal}
          deleteSubscriptionPlan={deleteSubscriptionPlan}
          isPending={isPending}
        />
      )}
    </DashboardSidebar>
  );
};

export default SubscriptionPlans;

SubscriptionPlans.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout page={"subscription-plans"}>{page}</DashboardLayout>;
};
