import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

//const local = "http://localhost:5000";
const remote = "https://library-card-backend.vercel.app";

function useTotalStudents() {
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["total-students"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${remote}/total-students`);
      return res.data;
    },
  });

  return [data, refetch];
}
export default useTotalStudents;
