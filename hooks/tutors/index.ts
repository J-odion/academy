import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import useStorage from "@/lib/useStorage";


export const useGetPendingAdmins = () => {
    const {getItem} = useStorage();
    const queryFn = async () => {
        const response = await axiosInstance.get("/getPendingAdmins");
        console.log(getItem("refreshToken"))
        return response?.data;
    };

    return useQuery({
        queryKey: ["pendingAdmins"],
        queryFn,
        retry: 3,
    });
}

export const useOnboardPendingAdmin = (adminId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put(`/onboardPendingAdmin/${adminId}`, data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if (response.status_code === 201 || response.status_code === 200) {
                toast({
                    title: "Admin successfully onboarded",
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

export const useOnboardedAdmins = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/getOnboardedAdmins");
        return response?.data;
    };

    return useQuery({
        queryKey: ["onboardedAdmins"],
        queryFn,
        retry: 1,
    });
}


export const useAddAdmin = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.post("superAdminAddAdmin", data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if (response.status_code === 201 || response.status_code === 200) {
                toast({
                    title: "Admin successfully added",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                queryClient.invalidateQueries({ queryKey: ["pendingAdmins"] });
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


export const useDeleteAdmin = (adminId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/users/deleteAdmin/${adminId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if (response.status_code === 201 || response.status_code === 200) {
                toast({
                    title: "Admin successfully deleted",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                queryClient.invalidateQueries({ queryKey: ["onboardedAdmins"] });
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
