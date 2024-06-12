import { axiosInstance } from "../../hooks/axiosInstance";
import useStorage from "@/lib/useStorage";

export const setAccessToken = (token: string) => {
    const { setItem } = useStorage();
    return setItem("access-token", token);
}

export const getAccessToken = () => {
    const { getItem } = useStorage();
    return getItem("access-token");
}

export const removeAccessToken = () => {
    const { removeItem } = useStorage();
    return removeItem("access-token");
}

export const setRefreshToken = (token: string) => {
    const { setItem } = useStorage();
    return setItem("refresh-token", token);
}

export const getRefreshToken = () => {
    const { getItem } = useStorage();
    return getItem("refresh-token");
}



  export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
        try {
            const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_TOKEN_API_URL}/refreshToken`, { params: { refresh: refreshToken } });
            console.log('Refresh token response:', response.data);
            const { newAccessToken, newRefreshToken } = response.data;
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            console.log(newAccessToken)
            // return newAccessToken;
            return newRefreshToken;
        } catch (error) {
            console.error("Refresh token error:", error);
            removeAccessToken();
            removeRefreshToken();
            throw error;
        }
    }
};

export const removeRefreshToken = () => {
    localStorage.removeItem("refresh-token");
}
