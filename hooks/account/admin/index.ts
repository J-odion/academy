import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "../../axiosInstance";
import { axiosInstance } from "../../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import useStorage from "@/lib/useStorage";

// const router = useRouter();


export const useAddFreeCourses = () => {
  const { toast } = useToast();
  const { getItem } = useStorage();

  const mutationFn = async (data: any) => {
    const response = await axiosInstance.post("/courses/addFreeCourse", data, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getItem("access-token")}`,
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
          title: "Courses successfully added",
          description: message,
          className: "toast-success",
        });
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
};


export const useGetFreeCourses = () => {
  const queryFn = async () => {
    const response = await axiosInstance.get("/courses/freeCourses");
    return response.data;
  };

  return useQuery({
    queryKey: ["freeCourses"],
    queryFn,
    retry: 1,
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

export const useDeleteFreeCourses = (itemId: any) => {
    const { toast } = useToast();
    const router = useRouter();

    const mutationFn = async () => {
        const response = await axiosInstance.delete(`/courses/deleteFreeCourse/${itemId}`);
        console.log(itemId)
        return response.data;
    };

    return useMutation({
        mutationFn,
        onSuccess: (response: any) => {
            if(response.message){
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

export const useGetShopperCourses = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/courses/shopperCourses");
        return response.data;
    };

    return useQuery({
        queryKey: ["shopperCourses"],
        queryFn,
        retry: 1,
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
