import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Custom Hook to use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
