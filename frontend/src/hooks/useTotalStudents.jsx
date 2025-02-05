import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useTotalStudents() {
  const { data, refetch } = useQuery({
    queryKey: ["total-students"],
    queryFn: async () => {
      const res = await axios.get(
        `https://library-card-backend.vercel.app/total-students`
      );
      return res.data;
    },
  });

  return [data, refetch];
}
export default useTotalStudents;
