import { Search } from "lucide-react";
import useAllStudents from "../hooks/useAllStudents";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const [query, setQuery] = useState("");
  const [student, setStudent] = useState(null);

  const [data, loading, refetch] = useAllStudents(query);

  //console.log(data);

  useEffect(() => {
    refetch();
  }, [query]);

  const handleSingleStudent = (id) => {
    //console.log(id);
    const singleStudent = data.find((student) => student._id === id);
    setStudent(singleStudent);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  //console.log(student);

  return (
    <div className="lg:flex gap-3">
      <div className="w-full max-w-7xl p-4 rounded-lg shadow-lg">
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
            <Link
              to="/print-backside"
              className="px-4 py-2 bg-green-800 font-semibold text-white rounded hover:bg-green-700"
            >
              Print Backside
            </Link>
          </div>
        </div>
        <div className="overflow-auto overflow-y-auto h-[85vh] p-4">
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
                  onClick={() => handleSingleStudent(applicant._id)}
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
      <div className="mt-5 p-2 w-full max-w-2xl border">
        <div className="text-xl font-semibold">
          <h2>
            Applicant ID{" "}
            <span className="ml-8">:&nbsp;{student?.applicant_id}</span>
          </h2>
          <h2>
            Name <span className="ml-[103px]">:&nbsp;{student?.Name}</span>
          </h2>
          <h2>
            Department{" "}
            <span className="ml-[38px]">
              :&nbsp;{student?.Current_Department}
            </span>
          </h2>
          <h2>
            Roll No <span className="ml-[87px]">:&nbsp;{student?.Roll}</span>
          </h2>
          <h2>
            Registration
            <span className="ml-[45px]">:&nbsp;{student?.Registration}</span>
          </h2>
          <h2>
            Designation
            {student && <span className="ml-[45px]">:&nbsp;Student</span>}
          </h2>
          <h2>
            Session
            {student && <span className="ml-[92px]">:&nbsp;2022-2023</span>}
          </h2>
          <h2>
            Blood Group
            {student && <span className="ml-[36px]">:&nbsp;A+</span>}
          </h2>
        </div>
        <div className="flex lg:h-28 justify-between mt-4 px-4">
          <div>
            <h2 className="border text-center w-40 font-semibold px-8 py-1 bg-green-600">
              Photo
            </h2>
            <div className="mt-2">
              {student && <img src={student?.picture} alt="profile" />}
            </div>
          </div>
          <h2 className="border h-9 px-8 py-1 bg-green-600 font-semibold">
            Signature
          </h2>
        </div>
        <div className="mt-12">
          <div className="flex items-end flex-col">
            <div className="flex w-1/2 justify-between gap-2  mt-4 ">
              <Link
                to={`/print-preview/${student?._id}`}
                className="border cursor-pointer font-semibold px-8 py-1 bg-green-600"
              >
                Print Preview
              </Link>
              <button className="border cursor-pointer font-semibold px-8 py-1 bg-green-600">
                Edit
              </button>
            </div>
            <div className="flex w-1/2 justify-between  gap-2 mt-4">
              <button className="cursor-pointer font-semibold px-5 py-1 bg-green-600 border">
                Print Completed
              </button>
              <button className="border cursor-pointer font-semibold px-5 py-1 bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
