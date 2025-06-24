import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { remote } from "../config/config";

const UpdatePage = () => {
  const { id } = useParams();
  const [flag, setFlag] = useState(false);
  const [student, setStudent] = useState({});
  const [signature, setSignature] = useState(null);
  const [studentImage, setStudentImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [profileImageError, setProfileImageError] = useState("");
  // const [hallName, setHallName] = useState("");

  const [loading, setLoading] = useState(true);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

  // Fetch student data
  useEffect(() => {
    fetch(`${remote}/student/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, flag]);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setImageError("Signature image size must be 2MB or less.");
        setSignature(null);
      } else {
        setImageError("");
        setSignature(file);
      }
    }
  };

  const handleImageUploadChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setProfileImageError("Student image size must be 2MB or less.");
        setStudentImage(null);
      } else {
        setProfileImageError("");
        setStudentImage(file);
      }
    }
  };

  const handleClick = async () => {
    setLoading(true);

    if (!signature) {
      alert("Please upload a valid signature image.");
      setLoading(false);
      return;
    }

    if (!studentImage) {
      alert("Please upload a valid student image.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("studentImage", studentImage);
      formData.append("signature", signature);
      // formData.append("hall_name", hallName);

      const res = await fetch(`${remote}/update-signature/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        setFlag(true);
        alert("Images uploaded and updated successfully!");
      } else {
        alert("Failed to upload images.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  if (!loading && !student) {
    return <h1>Loading...</h1>;
  }

  //console.log("Student:", student.can_update);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Applicant Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center col-span-2">
            <img
              src={student.picture}
              alt="No Image"
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
          {/* upload student image */}

          <div className="col-span-2">
            <label className="block text-red-600 ">
              Upload Student Image (2MB or less size)
            </label>
            <input
              onChange={handleImageUploadChange}
              type="file"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {profileImageError && (
              <p className="text-red-500">{profileImageError}</p>
            )}
          </div>

          {/* Upload Signature Section */}
          <div className="col-span-2">
            <label className="block text-red-600 ">
              Upload 2MB or less size signature
            </label>
            <input
              onChange={handleChange}
              type="file"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>

          {/* select hall name ,if student is male then show male hall and if student is female then show another hall*/}
          {/* {JSON.stringify(student)} */}
          {/* <div className="col-span-2">
            <label className="block text-gray-700">Select Hall Name</label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              onChange={(e) => setHallName(e.target.value)}
              disabled={!student?.can_update && student?.can_update === false}
            >
              <option value="">
                {student?.Gender === "MALE"
                  ? "Select a Male Hall"
                  : student?.Gender === "FEMALE"
                  ? "Select a Female Hall"
                  : "Select Hall"}
              </option>
              {student?.Gender === "MALE" && (
                <>
                  <option value="1">ছাত্র হল ১</option>
                  <option value="2">ছাত্র হল ২</option>
                </>
              )}
              {student?.Gender === "FEMALE" && (
                <>
                  <option value="1">ছাত্রী হল ১</option>
                  <option value="2">ছাত্রী হল ২</option>
                </>
              )}
            </select>
          </div> */}

          <div className="col-span-2">
            <button
              type="button"
              disabled={!student?.can_update && student?.can_update === false}
              onClick={handleClick}
              className="w-full bg-blue-500 text-white py-2 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed hover:bg-blue-600 transition"
            >
              {loading ? "Uploading..." : "Upload Signature"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
