import { useContext } from "react";
import UserContext from "../api/context/LoggedUserProvider";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
