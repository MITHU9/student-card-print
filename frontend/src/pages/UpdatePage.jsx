import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});

  //console.log(id);

  useEffect(() => {
    fetch(`http://localhost:5000/student/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudent(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(student);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Applicant Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center col-span-2">
            <img
              src={student?.picture}
              alt="Applicant"
              className="w-32 h-32 rounded-full border-2 mx-auto"
            />
          </div>
          <div>
            <label className="block text-gray-700">Applicant ID</label>
            <input
              type="text"
              value={student?.applicant_id}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Admission Roll</label>
            <input
              type="text"
              value={student?.Admission_roll}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Roll</label>
            <input
              type="text"
              value={student?.Roll}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Registration</label>
            <input
              type="text"
              value={student?.Registration}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={student?.Name}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Current Department</label>
            <input
              type="text"
              value={student?.Current_Department}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Father&apos;s Name</label>
            <input
              type="text"
              value={student?.F_Name}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mother&apos;s Name</label>
            <input
              type="text"
              value={student?.M_Name}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Religion</label>
            <input
              type="text"
              value={student?.religion}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              value={student?.Gender}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Upload Signature</label>
            <input type="file" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdatePage;
