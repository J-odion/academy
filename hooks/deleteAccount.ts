import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export const useDeleteUserAccount = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutationFn = async ({ reason, password }: any) => {
    const response = await axiosInstance.delete('/users/deleteAccount', {
      data: { reason, password }
    });
    return response.data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (response: any) => {
      if (response.message) {
        toast({
          title: "Account deleted successfully",
          description: `${response.message}`,
          className: "toast-success",
        });
        router.push("/");
      } else {
        toast({
          title: "Something went wrong... Try Again",
          description: `${response.error}`,
          className: "toast-error",
        });
      }
    },
  });
};
