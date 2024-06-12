import useStorage from "@/lib/useStorage";

const useTokenStorage = () => {
  const { getItem, setItem, removeItem } = useStorage();

  const setAccessToken = (token: string) => setItem("access-token", token);
  const getAccessToken = () => getItem("access-token");
  const removeAccessToken = () => removeItem("access-token");

  const setRefreshToken = (token: string) => setItem("refresh-token", token);
  const getRefreshToken = () => getItem("refresh-token");
  const removeRefreshToken = () => removeItem("refresh-token");

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
