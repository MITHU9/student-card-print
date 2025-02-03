import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useTotalStudents() {
  const { data, refetch } = useQuery({
    queryKey: ["total-students"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/total-students`);
      return res.data;
    },
  });

  return [data, refetch];
}
export default useTotalStudents;
