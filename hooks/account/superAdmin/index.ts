import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../../axiosInstance";
import { axiosInstance } from "../../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import {useStorage} from "@/lib/useStorage";


export const useGetAllUsers = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/users/getAllUsers");
        return response.data;
      };

      return useQuery({
        queryKey: ["getAllUsers"],
        queryFn,
        retry: 1,
    });

}

export const useGetAllAdmins = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/users/getAllAdmins");
        return response.data;
      };

      return useQuery({
        queryKey: ["getAllAdmins"],
        queryFn,
        retry: 1,
    });
};

export const useDeleteAdmin = (adminId: any) => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/users/deleteAdmin/${adminId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            toast({
                title: "Admin deleted successfully",
                description: `${response.message}`,
                className: "toast-success",
            });
            router.push("/dashboard/admin/tutors");
            // queryClient.invalidateQueries('getOnboardedAdmins');
        },
        onError: (error: any) => {
            toast({
                title: "Tutor rejection failed",
                description: 'Tutor rejection failed. Please try again',
                className: "toast-error",
            });
        }
    });

}

export const useGetOnboardedAdmins = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/getOnboardedAdmins");
        return response.data;
      };

      return useQuery({
        queryKey: ["getOnboardedAdmins"],
        queryFn,
        retry: 1,
    });
}

export const useGetPendingAdmins = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/getPendingAdmins");
        return response.data;
      };

      return useQuery({
        queryKey: ["getPendingAdmins"],
        queryFn,
        retry: 1,
    });
}


export const useOnboardPendingAdmin = (adminId: any) => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async () => {
        const response = await axiosInstance.put(`/onboardPendingAdmin/${adminId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            toast({
                title: "Admin onboarded successfully",
                description: `${response.message}`,
                className: "toast-success",
            });
            router.push("/dashboard/admin/tutors");
        },
        onError: (response: any) => {
            toast({
                title: "Admin onboarding failed",
                description: `${response.message}`,
                className: "toast-error",
            });
        }
    });
}


export const useAddAdmins = () => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.post("/superAdminAddAdmin", data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.message){
                toast({
                    title: "Admin added successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/admins");

            } else {
                toast({
                  title: "Something went wrong... Try Again",
                  description: `${response.error}`,
                  className: "toast-error",
                });
              }
        }
    });

}

export const useGetAllStudents = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/users/getAllStudents");
        return response.data;
      };

      return useQuery({
        queryKey: ["getAllStudents"],
        queryFn,
        retry: 1,
    });

}

export const useDeleteStudent = (studentId: any) => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/users/deleteStudent/${studentId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.message){
                toast({
                    title: "Student deleted successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/students");

            } else {
                toast({
                  title: "Something went wrong... Try Again",
                  description: `${response.error}`,
                  className: "toast-error",
                });
              }
        }
    });
}


export const useGetAllAdminSubscriptionPlans = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/subscription/getSubscriptionPlan");
        return response.data;
      };

      return useQuery({
        queryKey: ["getAllAdminSubscriptionPlans"],
        queryFn,
        retry: 1,
    });
}


export const useGetAllReviewedAssignments = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/assignment/getAllReviewedAssignments");
        return response.data;
      };

      return useQuery({
        queryKey: ["getReviewedLessons"],
        queryFn,
        retry: 1,
    });
}

export const useGetAllPendingAssignments = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/assignment/getAllPendingAssignments");
        return response.data;
      };

      return useQuery({
        queryKey: ["getPendingLessons"],
        queryFn,
        retry: 1,
    });
}


export const useGetAllAdminCategory = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/category/getCategory");
        return response.data;
    };

    return useQuery({
        queryKey: ["getAdminCategory"],
        queryFn,
        retry: 1,
    })
}
