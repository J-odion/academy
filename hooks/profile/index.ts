import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../../axiosInstance";
import { axiosInstance } from "../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import {useStorage} from "@/lib/useStorage";


export const useChangePassword = () => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put("/users/changePassword", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    };
    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            console.log('Response:', response);

            const { message, error } = response;

            if (message) {
                toast({
                    title: "Password successfully changed",
                    description: message,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/account");
            } else {
                toast({
                    title: "Something went wrong",
                    description: error || "An unexpected error occurred",
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

export const useChangeProfilePicture = () => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put("/users/changeProfilePicture", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    };
    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            console.log('Response:', response);

            const { message, error } = response;

            if (message) {
                toast({
                    title: "Profile picture successfully changed",
                    description: message,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/account");
            } else {
                toast({
                    title: "Something went wrong",
                    description: error || "An unexpected error occurred",
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


export const useChangeName = () => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put("/users/changeName", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    };
    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            console.log('Response:', response);

            const { message, error } = response;

            if (message) {
                toast({
                    title: "Name successfully changed",
                    description: message,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/account");
            } else {
                toast({
                    title: "Something went wrong",
                    description: error || "An unexpected error occurred",
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

export const useChangeEmail = () => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put("/users/changeEmail", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    };
    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            console.log('Response:', response);

            const { message, error } = response;

            if (message) {
                toast({
                    title: "Email successfully changed",
                    description: message,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/account");
            } else {
                toast({
                    title: "Something went wrong",
                    description: error || "An unexpected error occurred",
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


export const useGetProfilePicture = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/users/getProfilePicture");
        return response.data;
    };

    return useQuery({
        queryKey: ["profilePicture"],
        queryFn,
        retry: 1,
    });
}
