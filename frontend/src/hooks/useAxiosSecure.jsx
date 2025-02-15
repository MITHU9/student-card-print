import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://library-card-backend.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      //console.log(response);

      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        navigate("/admin");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
