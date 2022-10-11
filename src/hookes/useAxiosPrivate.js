import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async(config) => {
        let currentDate = new Date();
        const decodeToken = jwt_decode(auth.accessToken);
        if (!config.headers["authorization"]) {
          config.headers["authorization"] = `Bearer ${auth.accessToken}`;
          // config.headers["Content-type"] = `application/json`;
        }
        if(decodeToken.exp *1000 < currentDate.getTime()){
          const newAccessToken = await refresh();
          console.log(newAccessToken);
          config.headers['authorization'] = "Bearer " + newAccessToken
          // config.headers["Content-type"] = `application/json`;
        }
        console.log(config);
        return config;
      },
      (err) => Promise.reject(err)
    );


    // const requestIntercept = axiosPrivate.interceptors.request.use(
    //   (config) => {
    //     if (!config.headers["authorization"]) {
    //       config.headers["authorization"] = `Bearer ${auth.accessToken}`;
    //     }
    //     return config;
    //   },
    //   (err) => Promise.reject(err)
    // );

    // const responseIntercept = axiosPrivate.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const prevRequest = error?.config;
    //     if (error?.response?.status === 403 && !prevRequest?.sent) {
    //       prevRequest.sent = true;
    //       const newAccessToken = await refresh();
    //       console.log(prevRequest.headers);
    //       prevRequest.headers["authorization"] = "Bearer " + newAccessToken;
    //       return  axiosPrivate(prevRequest);
    //     }
    //     return Promise.reject(error);
    //   }
    // );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      // axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
