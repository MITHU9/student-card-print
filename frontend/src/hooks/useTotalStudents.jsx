import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { remote } from "../config/config";

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
