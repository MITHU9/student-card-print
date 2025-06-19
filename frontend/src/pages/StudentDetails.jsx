import { useLoaderData } from "react-router-dom";

const StudentDetails = () => {
  const data = useLoaderData();

  console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            src={data?.picture}
            alt={data?.Name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <h2 className="text-xl font-semibold mt-4">{data?.Name}</h2>
          <p className="text-gray-600">Dept: {data?.Current_Department}</p>
          <p className="text-gray-600">Roll: {data?.Roll}</p>
          <p className="text-gray-600">Session: {data?.session}</p>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          {/* <p>
            <span className="font-semibold">Gender:</span> {data?.Gender}
          </p> */}
          <p>
            <span className="font-semibold">Blood Group:</span>{" "}
            {data?.blood_group}
          </p>
          <p>
            <span className="font-semibold">Nationality:</span>{" "}
            {data?.nationality}
          </p>
          {/* <p>
            <span className="font-semibold">Religion:</span> {data?.religion}
          </p> */}
          <p>
            <span className="font-semibold">Father&apos;s Name:</span>{" "}
            {data?.F_Name}
          </p>
          {/* <p>
            <span className="font-semibold">Father&apos;s Occupation:</span>{" "}
            {data?.F_Occupation}
          </p> */}
          <p>
            <span className="font-semibold">Mother&apos;s Name:</span>{" "}
            {data?.M_Name}
          </p>
          {/* <p>
            <span className="font-semibold">Mother&apos;s Occupation:</span>{" "}
            {data?.M_occupation}
          </p> */}
          {/* <p>
            <span className="font-semibold">Family Income:</span>{" "}
            {data?.family_income} BDT
          </p> */}
          {/* <p>
            <span className="font-semibold">Mobile:</span> 0{data?.Mobile}
          </p> */}
          <p>
            <span className="font-semibold">Emergency Number:</span> 0
            {data?.phone}
          </p>
          {/* <p>
            <span className="font-semibold">Admission Roll:</span>{" "}
            {data?.Admission_roll}
          </p> */}
        </div>
      </div>
    </div>
  );
};
export default StudentDetails;
