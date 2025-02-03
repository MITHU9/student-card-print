import { Search } from "lucide-react";
import useAllStudents from "../hooks/useAllStudents";
import { useEffect, useState } from "react";

const AllStudents = () => {
  const [query, setQuery] = useState("");

  const [data, loading, refetch] = useAllStudents(query);

  //console.log(data);

  useEffect(() => {
    refetch();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl p-4">
      <div className=" rounded-lg shadow-lg">
        <div className="flex items-center gap-4 my-2">
          <div className="my-2 relative w-56">
            <input
              className="w-full p-2 border border-gray-300 rounded outline-none "
              type="text"
              placeholder="Search student by roll...."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute right-2 top-2.5" />
          </div>
          <div>
            <button
              className="px-4 py-2 bg-green-800 font-semibold text-white rounded hover:bg-green-700"
              //onClick={() => window.print()}
            >
              Print Backside
            </button>
          </div>
        </div>
        <div className="overflow-auto overflow-y-auto h-[80vh] p-4">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-pink-800 text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">SL</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Gender</th>
                <th className="py-3 px-6 text-left">RollNo.</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-left">Registration</th>
                <th className="py-3 px-6 text-left">Photo</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {data?.map((applicant) => (
                <tr
                  key={applicant.applicant_id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{applicant.SL}</td>
                  <td className="py-3 px-6 text-left font-medium">
                    {applicant.Name}
                  </td>
                  <td className="py-3 px-6 text-left">{applicant.Gender}</td>
                  <td className="py-3 px-6 text-left">{applicant.Roll}</td>
                  <td className="py-3 px-6 text-left">
                    {applicant.Current_Department}
                  </td>

                  <td className="py-3 px-6 text-left">
                    {applicant.Registration}
                  </td>
                  <td className="py-3 px-6">
                    <img
                      src={applicant.picture}
                      alt={applicant.Name}
                      className="w-10 h-10 rounded-full border"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
