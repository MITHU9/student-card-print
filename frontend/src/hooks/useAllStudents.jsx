import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useAllStudents(query) {
  const { data, loading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const url = query
        ? `https://library-card-backend.vercel.app/students?query=${query}`
        : `https://library-card-backend.vercel.app/students`;

      const res = await axios.get(url);
      return res.data;
    },
  });

  return [data, loading, refetch];
}
export default useAllStudents;
