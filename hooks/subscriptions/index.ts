import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export const  useAddSubscriptionPlan = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async (data: any) => {
      const response = await axiosInstance.post("subscription/addSubscriptionPlan", data);
      return response.data;
    };

    return useMutation({
      mutationFn,
      onSuccess: (response: any) => {
        console.log('Response:', response);

        const { message, error } = response;

        if (message) {
            toast({
                title: "Subscription Plan successfully added",
                description: message,
                className: "toast-success",
            });
          queryClient.invalidateQueries({
            queryKey: ['subscriptionPlan'],
            exact: true,
          });
          // router.push("/dashboard/admin/courses");
        } else {
            toast({
                title: "Something went wrong... Try Again",
                description: error || "An error occurred while adding subscription plan",
                className: "toast-error",
            });
        }
      },
      onError: (error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "An error occurred, please try again",
          className: "toast-error",
        });
      },
    });

  };

export const useGetSubscriptionPlans = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("subscription/getSubscriptionPlan");
        return response?.data;
    };

    return useQuery({
        queryKey: ["subscriptionPlan"],
        queryFn,
        retry: 1,
    });
}

export const useUpdateSubscriptionPlan = (accountId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put(`subscription/updateSubscriptionPlan/${accountId}`, data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
          console.log('Response:', response);

          const { message, error } = response;

          if (message) {
              toast({
                  title: "Subscription Plan successfully updated",
                  description: message,
                  className: "toast-success",
              });
            queryClient.invalidateQueries({
              queryKey: ['subscriptionPlan'],
              exact: true,
            });
          } else {
              toast({
                  title: "Something went wrong... Try Again",
                  description: error || "An error occurred while adding subscription plan",
                  className: "toast-error",
              });
          }
        },
        onError: (error) => {
          console.error("Error:", error);
          toast({
            title: "Error",
            description: "An error occurred, please try again",
            className: "toast-error",
          });
        },
      });
}

export const useDeleteSubscriptionPlan = (subscriptionPlanId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`subscription/deleteSubscriptionPlan/${subscriptionPlanId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: () => {
                toast({
                    title: "Subscription Plan successfully deleted",
                    // description: `${response.message}`,
                    className: "toast-success",
                });
                queryClient.invalidateQueries({ queryKey: ["subscriptionPlan"] });
            },
        onError: () => {
            toast({
                title: "Something went wrong... Try Again",
                // description: response.error,
                className: "toast-error",
            })
        }
})
}
