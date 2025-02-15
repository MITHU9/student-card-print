import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

//const local = "http://localhost:5000";
const remote = "https://library-card-backend.vercel.app";

function useAllStudents(query) {
  const axiosSecure = useAxiosSecure();

  const { data, loading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const url = query ? `${remote}?query=${query}` : `${remote}/students`;

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  return [data, loading, refetch];
}
export default useAllStudents;
