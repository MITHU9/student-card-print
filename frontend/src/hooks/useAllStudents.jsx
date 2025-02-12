import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const local = "http://localhost:5000";
const remote = "https://library-card-backend.vercel.app";

function useAllStudents(query) {
  const { data, loading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const url = query ? `${local}?query=${query}` : `${local}/students`;

      const res = await axios.get(url);
      return res.data;
    },
  });

  return [data, loading, refetch];
}
export default useAllStudents;
