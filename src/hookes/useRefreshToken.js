import axios from "../api/axios";
import useAuth from "./useAuth";
axios.defaults.withCredentials = true;

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get("/api/auth/refresh", {withCredentials: true});
    setAuth((prev) => {
      console.log(res.data.accessToken);
      return { ...prev, accessToken: res.data.accessToken };
    });

    return res.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
