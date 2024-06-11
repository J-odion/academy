import { axiosInstance } from "../axiosInstance";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_TOKEN_API_URL}/refreshToken`, {
            withCredentials: true
    });
    setAuth((prev: any) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { ...prev, access: response.data.accessToken };
    })
    return response.data.accessToken;
}
return refresh;
}

export default useRefreshToken;
