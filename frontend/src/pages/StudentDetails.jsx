import { useLoaderData } from "react-router-dom";

const StudentDetails = () => {
  const data = useLoaderData();

  const user = {
    admission_roll: 146990,
    current_department: "Pharmacy",
    dept_code: 13,
    father_name: "MD AZIZUR RAHMAN",
    father_occupation: "ARMY JUNIOUR COMMISSOUND OFFICER (Retired)",
    gender: "FEMALE",
    mother_name: "SHAMSUNNAHAR BEGUM",
    mother_occupation: "Housewife",
    mobile: "1780015335",
    name: "MST. TASNIM JAHAN",
    registration: 1135426,
    roll: "241302",
    sl: 2,
    applicant_id: 1261161,
    blood_group: "AB+",
    family_income: 240000,
    nationality: "BANGLADESHI",
    phone: "1822072270",
    picture:
      "https://d3ik3xy0ts3wqq.cloudfront.net/public/uploads/1261161-1707747035.jpg",
    religion: "ISLAM",
  };

  console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <img
            src={user.picture}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-600">
            {user.current_department} (Dept: {user.dept_code})
          </p>
          <p className="text-gray-600">
            Roll: {user.roll} | Reg: {user.registration}
          </p>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Gender:</span> {user.gender}
          </p>
          <p>
            <span className="font-semibold">Blood Group:</span>{" "}
            {user.blood_group}
          </p>
          <p>
            <span className="font-semibold">Nationality:</span>{" "}
            {user.nationality}
          </p>
          <p>
            <span className="font-semibold">Religion:</span> {user.religion}
          </p>
          <p>
            <span className="font-semibold">Father&apos;s Name:</span>{" "}
            {user.father_name}
          </p>
          <p>
            <span className="font-semibold">Father&apos;s Occupation:</span>{" "}
            {user.father_occupation}
          </p>
          <p>
            <span className="font-semibold">Mother&apos;s Name:</span>{" "}
            {user.mother_name}
          </p>
          <p>
            <span className="font-semibold">Mother&apos;s Occupation:</span>{" "}
            {user.mother_occupation}
          </p>
          <p>
            <span className="font-semibold">Family Income:</span>{" "}
            {user.family_income} BDT
          </p>
          <p>
            <span className="font-semibold">Mobile:</span> {user.mobile}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Admission Roll:</span>{" "}
            {user.admission_roll}
          </p>
        </div>
      </div>
    </div>
  );
};
export default StudentDetails;
