import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { remote } from "../config/config";

function useAllStudents(query, session, department) {
  const axiosSecure = useAxiosSecure();

  const { data, loading, isFetching, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const url = query
        ? `${remote}/students?query=${query}`
        : `${remote}/students?session=${session}&department=${department}`;

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return [data, loading, isFetching, refetch];
}
export default useAllStudents;
