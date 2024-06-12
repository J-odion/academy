import { useStorage } from "@/lib/useStorage";

const useTokenStorage = () => {
  // const { getItem, setItem, removeItem } = useStorage();

  const setAccessToken = (token: string) => useStorage.setItem("access-token", token);
  const getAccessToken = () => useStorage.getItem("access-token");
  const removeAccessToken = () => useStorage.removeItem("access-token");

  const setRefreshToken = (token: string) => useStorage.setItem("refresh-token", token);
  const getRefreshToken = () => useStorage.getItem("refresh-token");
  const removeRefreshToken = () => useStorage.removeItem("refresh-token");

  return {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
  };
};

export default useTokenStorage;
