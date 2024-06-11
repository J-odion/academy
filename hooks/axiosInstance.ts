import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { getAccessToken, getRefreshToken, refreshAccessToken, removeAccessToken, removeRefreshToken } from "@/services/authService";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TOKEN_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    //changed access to refresh token. will chnage if necessary
    const accessToken = getAccessToken();
    console.log("Access Token from localStorage:", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log("Authorization Header Set:", config.headers["Authorization"]);
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newAccessToken = await refreshAccessToken();
//         if (newAccessToken) {
//           originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//           console.log("New Access Token:", newAccessToken);
//           return axiosInstance(originalRequest);
//         }
//       } catch (refreshError) {
//         console.error("Refresh token error:", refreshError);
//         removeAccessToken();
//         removeRefreshToken();
//         const { toast } = useToast();
//         toast({
//           title: "Session Expired",
//           description: "Please login again",
//           className: "toast-error",
//         });
//         // window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );





// axiosInstance.interceptors.response.use(
//   async (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     const RefreshToken = localStorage?.getItem("refresh-token")
//           //@ts-ignore
//           ? JSON.parse(localStorage?.getItem("refresh-token")! === 'undefined' ? null : localStorage.getItem("refresh-token"))
//           : null;
//     if(error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_TOKEN_API_URL}/refreshToken`, { refresh: RefreshToken });
//         localStorage.setItem("access-token", JSON.stringify(data.access ?? null));
//         localStorage.setItem("refresh-token", JSON.stringify(data.refresh ?? null));
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token error:", refreshError);
//         localStorage.removeItem("access-token");
//         localStorage.removeItem("refresh-token");
//         // window.location.href = "/";
//       }
//     } else if(error.response?.status === 401 && error.response?.data?.code === "token_not_valid") {
//       const { toast } = useToast();
//       toast({
//         title: "Session Expired",
//         description: "Please login again",
//         className: "toast-error",
//       });
//       // logout();
//       return Promise.reject(error);
//     } else {
//       console.error("Token not valid:", error);
//       return Promise.reject(error);
//     }
//
// )
