import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export const useAddSubscriptionPlan = () => {
    const { toast } = useToast();
    const mutationFn = async (data: any) => {
        const response = await axiosInstance.post("subscription/addSubscriptionPlan", data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if (response.status_code === 201 || response.status_code === 200) {
                toast({
                    title: "Subscription Plan successfully added",
                    description: `${response.message}`,
                    className: "toast-success",
                });
            } else {
                console.log(response.error);
                toast({
                    title: "Something went wrong... Try Again",
                    description: response.error,
                    className: "toast-error",
                });
            }
        },
    });
}

export const useGetSubscriptionPlans = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("subscription/getSubscriptionPlans");
        return response?.data;
    };

    return useQuery({
        queryKey: ["subscriptionPlans"],
        queryFn,
        retry: 1,
    });
}

export const useUpdateSubscriptionPlan = (subscriptionPlanId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put(`subscription/updateSubscriptionPlan/${subscriptionPlanId}`, data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if (response.status_code === 201 || response.status_code === 200) {
                toast({
                    title: "Subscription Plan successfully updated",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                queryClient.invalidateQueries({ queryKey: ["subscriptionPlans"] });
            } else {
                console.log(response.error);
                toast({
                    title: "Something went wrong... Try Again",
                    description: response.error,
                    className: "toast-error",
                });
            }
        },
    });
}


export const useDeleteSubscriptionPlan = (subscriptionPlanId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`subscription/deleteSubscriptionPlan/${subscriptionPlanId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if (response.status_code === 201 || response.status_code === 200) {
                toast({
                    title: "Subscription Plan successfully deleted",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                queryClient.invalidateQueries({ queryKey: ["subscriptionPlans"] });
            } else {
                console.log(response.error);
                toast({
                    title: "Something went wrong... Try Again",
                    description: response.error,
                    className: "toast-error",
                });
            }
        },
    });
}
