import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export const useGetAllTransactions = () => {
    const queryFn = async () => {
        const response = await axiosInstance.get("/transactions");
        return response?.data;
    };

    return useQuery({
        queryKey: ["transactions"],
        queryFn,
        retry: 1,
    });
};
