import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { remote } from "../config/config";
// const imageHostingApi = `https://api.imgbb.com/1/upload?key=4276e99e16c8c70522c44d4e9b5eb595`;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=aaa3602bfadd7d7abefeceed90bf5997`;

const UpdatePage = () => {
  const { id } = useParams();
  const [flag, setFlag] = useState(false);
  const [student, setStudent] = useState({});
  const [signature, setSignature] = useState(null);
  const [studentImage, setStudentImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [profileImageError, setProfileImageError] = useState("");

  const [loading, setLoading] = useState(true);

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
    // console.log("File:", file);

    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.onload = () => {
          const { width, height } = img;
          if (width > 300 || height > 80) {
            setImageError("Image dimensions must be 300x80 or less.");
            setSignature(null);
          } else {
            setImageError("");
            setSignature(file);
          }
        };
        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };
  const handleImageUploadChange = (e) => {
    const file = e.target.files[0];
    console.log("File:", file);
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onloadend = () => {
        img.onload = () => {
          const { width, height } = img;
          if (width > 300 || height > 300) {
            setProfileImageError("Image dimensions must be 300x300 or less.");
            setStudentImage(null);
          } else {
            setProfileImageError("");
            setStudentImage(file);
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
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
      // Upload student image
      const studentImgFormData = new FormData();
      studentImgFormData.append("image", studentImage);
      const studentImgRes = await fetch(imageHostingApi, {
        method: "POST",
        body: studentImgFormData,
      });
      const studentImgData = await studentImgRes.json();
      const studentImageUrl = studentImgData?.data?.url;

      // Upload signature image
      const signatureFormData = new FormData();
      signatureFormData.append("image", signature);
      const signatureRes = await fetch(imageHostingApi, {
        method: "POST",
        body: signatureFormData,
      });
      const signatureData = await signatureRes.json();
      const signatureUrl = signatureData?.data?.url;

      if (signatureUrl && studentImageUrl) {
        const payload = {
          studentImage: studentImageUrl,
          signature: signatureUrl,
        };

        console.log("Payload to send:", payload);

        const updateRes = await fetch(`${remote}/update-signature/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (updateRes.ok) {
          setFlag(true);
          setLoading(false);
          alert("Images uploaded and updated successfully!");
        } else {
          alert("Failed to update in database.");
          setLoading(false);
        }
      } else {
        alert("Failed to upload both images. Try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
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

          {/* Upload Signature Section */}
          <div className="col-span-2">
            <label className="block text-gray-700">
              Upload 300x80 or less dimension signature
            </label>
            <input
              onChange={handleChange}
              type="file"
              className="w-full px-4 py-2 border rounded-lg"
            />
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>
          {/* upload student image */}

          <div className="col-span-2">
            <label className="block text-gray-700">
              Upload Student Image (300x300 or less)
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
