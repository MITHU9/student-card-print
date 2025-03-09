import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAllStudents from "../hooks/useAllStudents";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { remote } from "../config/config";

const AllStudents = () => {
  const [query, setQuery] = useState("");
  const [getSession, setGetSession] = useState([]);
  const [student, setStudent] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [session, setSession] = useState("all");
  const [department, setDepartment] = useState("all");

  const [data, loading, isFetching, refetch] = useAllStudents(
    query,
    session,
    department
  );

  useEffect(() => {
    refetch();
  }, [query, session, department]);

  useEffect(() => {
    axiosSecure
      .get(`${remote}/all-session`)
      .then((res) => {
        if (res) {
          setGetSession(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [student]);

  const handleUpdate = (id) => {
    axiosSecure
      .patch(`${remote}/${id}`, {})
      .then((res) => {
        console.log(res.data);
        alert("Updated successfully");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const handleComplete = (id) => {
    axiosSecure
      .patch(`${remote}/${id}`, {})
      .then((res) => {
        console.log(res.data);
        alert("Print Completed");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const handleDelete = (id) => {
    axiosSecure
      .delete(`${remote}/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("Deleted successfully");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const handleSingleStudent = (id) => {
    //console.log(id);
    const singleStudent = data.find((student) => student._id === id);
    setStudent(singleStudent);
  };

  if (loading) {
    return (
      <div className="text-center flex items-center justify-center w-[100vw] h-[75vh] text-2xl font-semibold text-red-500 animate-spin">
        <Loader2 />
      </div>
    );
  }

  //console.log(getSession);

  return (
    <div className="lg:flex gap-3">
      <div className="w-full max-w-7xl p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between gap-4 my-2">
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
          <div className="gap-2 p-4 w-1/2 rounded-lg shadow-md  bg-white flex items-center justify-between">
            <label className="block text-gray-700 font-semibold mb-1">
              Session:
            </label>
            <select
              onChange={(e) => setSession(e.target.value)}
              className="w-1/2 border p-2 rounded mb-3"
            >
              <option value="all">All</option>
              {getSession.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mb-1">
              Department:
            </label>
            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="w-1/2 border p-2 rounded"
            >
              <option value="all">All</option>
              <option value="Computer Science and Engineering">CSE</option>
              <option value="Electrical and Electronic Engineering">EEE</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Business Administration">BBA</option>
              <option value="Electrical, Electronic and Communication Engineering">
                EECE
              </option>
              <option value="Information and Communication Engineering">
                ICE
              </option>
              <option value="Physics">Physics</option>
              <option value="Geography and Environment">GE</option>
              <option value="Bangla">Bangla</option>
              <option value="Civil Engineering">CE</option>
              <option value="Architecture">Architecture</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Social Work">SW</option>
              <option value="Statistics">Statistics</option>
              <option value="Urban and Regional Planning">URP</option>
              <option value="English">English</option>
              <option value="Public Administration">PA</option>
              <option value="History">History</option>
              <option value="Tourism and Hospitality Management">THM</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-[85vh] lg:w-5xl p-4">
          <table className="min-w-full bg-white border border-gray-300 overflow-x-scroll  shadow-md rounded-lg">
            <thead>
              <tr className="bg-pink-800 text-gray-300 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">SL</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Gender</th>
                <th className="py-3 px-6 text-left">RollNo.</th>
                <th className="py-3 px-6 text-left">Department</th>
                <th className="py-3 px-6 text-left">Session</th>
                <th className="py-3 px-6 text-left">Registration</th>
                <th className="py-3 px-6 text-left">PHONE</th>
                <th className="py-3 px-6 text-left">BLOOD_GROUP</th>
                <th className="py-3 px-6 text-left">Photo</th>
                <th className="py-3 px-6 text-left">Signature</th>
                <th className="py-3 px-6 text-left">Can_Update</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {data && data.length > 0 ? (
                data?.map((applicant) => (
                  <tr
                    key={applicant.applicant_id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                    onClick={() => handleSingleStudent(applicant._id)}
                  >
                    <td className="py-3 px-6 text-left">{`${
                      1 + data.indexOf(applicant)
                    }`}</td>
                    <td className="py-3 px-6 text-left font-medium">
                      {applicant.Name}
                    </td>
                    <td className="py-3 px-6 text-left">{applicant.Gender}</td>
                    <td className="py-3 px-6 text-left">{applicant.Roll}</td>
                    <td className="py-3 px-6 text-left">
                      {applicant.Current_Department}
                    </td>
                    <td className="py-3 px-6 text-left">{applicant.session}</td>

                    <td className="py-3 px-6 text-left">
                      {applicant.Registration}
                    </td>
                    <td className="py-3 px-6 text-left">{applicant.Mobile}</td>
                    <td className="py-3 px-6 text-left">
                      {applicant.blood_group}
                    </td>
                    <td className="py-3 px-6">
                      <img
                        src={applicant.picture}
                        alt={applicant.Name}
                        className="w-10 h-10 rounded-full border"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <img
                        src={applicant.signature}
                        alt={applicant.Name}
                        className="w-full h-8 border"
                      />
                    </td>
                    <td className="py-3 px-6">
                      <button
                        className="
                        disabled:opacity-50 disabled:cursor-not-allowed
                      border w-full px-4 py-1 bg-green-600 text-white rounded-lg cursor-pointer
                      "
                        disabled={
                          !Object.keys(applicant).includes("can_update")
                        }
                        onClick={() => handleUpdate(applicant._id)}
                      >
                        {Object.keys(applicant).includes("can_update") ? (
                          <span>{applicant.can_update ? "Yes" : "No"}</span>
                        ) : (
                          <span>Yes</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  {isFetching ? (
                    <tr className="text-center flex items-center justify-center w-[100vw] lg:w-[50vw] h-[75vh] text-2xl font-semibold text-red-500 animate-spin">
                      <Loader2 />
                    </tr>
                  ) : (
                    <tr className="text-center flex items-center justify-center w-[100vw] h-[75vh] text-2xl font-semibold text-red-500 ">
                      <p>No data found</p>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 p-2 w-full min-w-xl border">
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
            Mobile
            {student && (
              <span className="ml-[97px]">:&nbsp;{student.Mobile}</span>
            )}
          </h2>
          <h2>
            Session
            {student && <span className="ml-[92px]">:&nbsp;2022-2023</span>}
          </h2>
          <h2>
            Blood Group
            {student && (
              <span className="ml-[36px]">:&nbsp;{student.blood_group}</span>
            )}
          </h2>
        </div>
        <div className="flex lg:h-52 mt-8 justify-between px-4">
          <div>
            <h2 className="border text-center w-40 font-semibold px-8 py-1 bg-green-600">
              Photo
            </h2>
            <div className="mt-2">
              {student && <img src={student?.picture} alt="profile" />}
            </div>
          </div>
          <div>
            <h2 className="border h-9 px-8 py-1 bg-green-600 font-semibold">
              Signature
            </h2>
            <div className="mt-2">
              {student?.signature && (
                <img src={student?.signature} alt="signature" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="flex items-end flex-col">
            <div className="flex w-1/2 justify-between gap-2  mt-4 ">
              <Link
                to={`/print-preview/${student?._id}`}
                onClick={(e) => {
                  if (!student) {
                    e.preventDefault();
                    alert("Please select a student.");
                  }
                }}
                className="border cursor-pointer font-semibold px-8 py-1 bg-green-600"
              >
                Print Preview
              </Link>
              <button
                //onClick={() => handleEdit(student?._id)}
                className="border cursor-pointer font-semibold px-8 py-1 bg-green-600"
              >
                Edit
              </button>
            </div>
            <div className="flex w-1/2 justify-between  gap-2 mt-4">
              <button
                onClick={() => handleComplete(student?._id)}
                className="cursor-pointer font-semibold px-5 py-1 bg-green-600 border"
              >
                Print Completed
              </button>
              <button
                onClick={() => handleDelete(student?._id)}
                className="border cursor-pointer font-semibold px-5 py-1 bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <div>
            <Link
              to={`/print-backside/${student?._id}`}
              onClick={(e) => {
                if (!student) {
                  e.preventDefault();
                  alert("Please select a student.");
                }
              }}
              className="px-4 py-2 bg-green-800 font-semibold text-white rounded hover:bg-green-700"
            >
              Print Backside
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
