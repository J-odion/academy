import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

// const router = useRouter();


export const useAddFreeCourses = () => {
    const { toast } = useToast();

    const mutationFn = async (data: FormData) => {
        const response = await axiosInstance.post("/courses/addFreeCourse", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      };

      return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
          if (response.status_code === 201 || response.status_code === 200) {
               toast({
              title: "Courses successfully added",
              description: `${response.message}`,
              className: "toast-success",
            });
          } else {
            console.log(response.error)
            toast({
              title: "Something went wrong... Try Again",

              description:
                response.errors && response.errors.length > 0
                  ? response.errors[0].error
                  : response.error,
              className: "toast-error",
            });
          }
        },
      });
}


export const useUpdateFreeCourses = (accountId: any) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.put(`/courses/updateFreeCourse/${accountId}`, data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ["freeCourses", accountId] });
            if(response.status === 200 || response.status === 201){
                toast({
                    title: "Course updated successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
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

export const useDeleteFreeCourses = (accountId: any) => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/courses/deleteFreeCourse/${accountId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.status === 200 || response.status === 201 || response.status_code === 204){
                toast({
                    title: "Course deleted successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/courses");

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


export const useDeleteCategory = (categoryId: any) => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/courses/deleteCategory/${categoryId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.status === 200 || response.status === 201 || response.status_code === 204){
                toast({
                    title: "Category deleted successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/courses");

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

export const useAddShopperCourse = () => {
    const { toast } = useToast();

    const mutationFn = async (data: any) => {
        const response = await axiosInstance.post("/courses/addShopperCourse", data);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.status === 200 || response.status === 201){
                toast({
                    title: "Course added successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
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


export const useDeleteShoppperCourse = (accountId: any) => {
    const { toast } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/courses/deleteShopperCourse/${accountId}`);
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.status === 200 || response.status === 201 || response.status_code === 204){
                toast({
                    title: "Course deleted successfully",
                    description: `${response.message}`,
                    className: "toast-success",
                });
                router.push("/dashboard/admin/courses");

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
