import axios from "axios";
import { useToast } from "@/components/ui/use-toast";


export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Unauthorized, redirecting to login page");
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
