import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const local = "http://localhost:5000";
const remote = "https://library-card-backend.vercel.app";

function useTotalStudents() {
  const { data, refetch } = useQuery({
    queryKey: ["total-students"],
    queryFn: async () => {
      const res = await axios.get(`${local}/total-students`);
      return res.data;
    },
  });

  return [data, refetch];
}
export default useTotalStudents;
