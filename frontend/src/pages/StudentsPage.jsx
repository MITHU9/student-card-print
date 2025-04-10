import { jsPDF } from "jspdf";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { remote } from "../config/config";
import useAllStudents from "../hooks/useAllStudents";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AllStudents = () => {
  const [query, setQuery] = useState("");
  const [getSession, setGetSession] = useState([]);
  const [student, setStudent] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [session, setSession] = useState("all");
  const [department, setDepartment] = useState("all");
  const [isPrinting, setIsPrinting] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modal, setModal] = useState(false);

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
    if (!id) {
      alert("Please select a student");
      return;
    }

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
    if (!id) {
      alert("Please select a student");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    axiosSecure
      .delete(`${remote}/delete-student/${id}`)
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

  const handleEdit = (student) => {
    if (!student) {
      alert("Please select a student");
      return;
    }
    setSelectedStudent(student);
    setModal(true);
  };

  const handleChange = (e) => {
    setSelectedStudent({ ...selectedStudent, [e.target.name]: e.target.value });
  };

  const handleEditStudent = (e) => {
    e.preventDefault();
    axiosSecure
      .put(`${remote}/update-student/${selectedStudent._id}`, selectedStudent)
      .then((res) => {
        console.log(res.data);
        alert("Updated successfully");
        refetch();
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };

  const printDepartmentPDFs = async () => {
    if (department === "all") {
      alert("Please select a specific department first");
      return;
    }

    if (!data || data.length === 0) {
      alert("No students found in this department");
      return;
    }

    setIsPrinting(true);

    try {
      // Create a new PDF document in portrait mode
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Card dimensions and spacing
      const cardWidth = pageWidth - 20; // Full width with 10mm margins
      const cardHeight = (pageHeight - 25) / 4; // Divide page height for 4 cards
      const marginX = 10; // 10mm side margins
      const marginTop = 10; // 10mm top margin
      const gap = 5; // 5mm gap between cards

      // Process all students
      for (let i = 0; i < data.length; i++) {
        const student = data[i];
        const studentIndexInPage = i % 4; // 0-3 (4 students per page)

        // Add new page after every 4 students (except first page)
        if (i > 0 && i % 4 === 0) {
          doc.addPage();
        }

        // Calculate Y position
        const y = marginTop + (cardHeight + gap) * studentIndexInPage;

        // Draw card border (optional)
        doc.setDrawColor(200, 200, 200); // Light gray border
        doc.rect(marginX, y, cardWidth, cardHeight);

        // Add university header
        // doc.setFontSize(12);
        // doc.setFont("helvetica", "bold");
        // doc.setTextColor(0, 0, 128); // Navy blue
        // doc.text("UNIVERSITY NAME", marginX + cardWidth / 2, y + 10, {
        //   align: "center",
        // });

        // Student photo (right side)
        if (student.picture) {
          try {
            doc.addImage({
              imageData: student.picture,
              x: marginX + cardWidth - 30,
              y: y + 15,
              width: 25,
              height: 25,
              format: "JPEG",
            });
          } catch (error) {
            console.error("Error adding photo:", error);
          }
        }

        // Student information (left side)
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0); // Black text

        // Name
        doc.text(`Name: ${student.Name}`, marginX + 10, y + 20);

        // Department
        doc.text(
          `Department: ${student.Current_Department}`,
          marginX + 10,
          y + 27
        );

        // Roll and Session
        doc.text(`Roll: ${student.Roll}`, marginX + 10, y + 34);
        doc.text(`Session: ${student.session}`, marginX + 10, y + 41);

        // Blood Group (if available)
        if (student.blood_group) {
          doc.text(`Blood Group: ${student.blood_group}`, marginX + 10, y + 48);
        }
        //emergency contact
        if (student.phone) {
          doc.text(
            `Emergency Contact: 0${student.phone}`,
            marginX + 10,
            y + 55
          );
        }

        // Signature (bottom right)
        if (student.signature) {
          try {
            doc.addImage({
              imageData: student.signature,
              x: marginX + cardWidth - 40,
              y: y + cardHeight - 15,
              width: 35,
              height: 10,
              format: "JPEG",
            });
          } catch (error) {
            console.error("Error adding signature:", error);
          }
        }

        // Student ID (bottom left)
        // doc.setFontSize(8);
        // doc.setTextColor(100, 100, 100);
        // doc.text(
        //   `Student ID: ${student.applicant_id}`,
        //   marginX + 10,
        //   y + cardHeight - 5
        // );

        // Horizontal divider (except for last card on page)
        if (studentIndexInPage < 3) {
          doc.setDrawColor(200, 200, 200);
          doc.line(
            marginX,
            y + cardHeight + gap / 2,
            marginX + cardWidth,
            y + cardHeight + gap / 2
          );
        }
      }

      // Save the PDF
      doc.save(
        `${department.replace(/\s+/g, "_")}_ID_Cards_${new Date()
          .toISOString()
          .slice(0, 10)}.pdf`
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please check console for details.");
    } finally {
      setIsPrinting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center flex items-center justify-center w-[100vw] h-[75vh] text-2xl font-semibold text-red-500 animate-spin">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="lg:flex gap-3 relative">
      <div className="w-full max-w-7xl p-4 rounded-lg shadow-lg">
        {modal && selectedStudent && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
              <h2 className="text-center text-2xl font-semibold">
                Edit Student
              </h2>
              <form action="" onSubmit={handleEditStudent}>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={selectedStudent.Name}
                    className="border p-2 rounded"
                    name="Name"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={selectedStudent.Current_Department}
                    className="border p-2 rounded"
                    name="Current_Department"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    value={selectedStudent.Roll}
                    className="border p-2 rounded"
                    name="Roll"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={selectedStudent.Mobile}
                    className="border p-2 rounded"
                    name="Mobile"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={selectedStudent.blood_group}
                    className="border p-2 rounded"
                    name="blood_group"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    value={selectedStudent.session}
                    className="border p-2 rounded"
                    name="session"
                    onChange={handleChange}
                  />
                  <button
                    onClick={() => {
                      setModal(false);
                      setSelectedStudent(null);
                    }}
                    className="border p-2 rounded bg-red-600 text-white cursor-pointer hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="border p-2 rounded bg-green-600 text-white cursor-pointer hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 my-2">
          {!modal && (
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
          )}
          <div className="gap-2 p-4 w-2/3 rounded-lg shadow-md  bg-white flex items-center justify-between">
            <label className="block text-gray-700 font-semibold mb-1">
              Session:
            </label>
            <select
              onChange={(e) => setSession(e.target.value)}
              className="w-36 border p-2 rounded mb-3"
            >
              <option value="all">All</option>
              {getSession.map((session, index) => (
                <option key={index} value={session}>
                  {session}
                </option>
              ))}
            </select>

            <label className="block text-gray-700 font-semibold mb-1">
              Dept.:
            </label>
            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="w-36 border p-2 rounded"
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

            {/* pdf generate */}
            <button
              onClick={printDepartmentPDFs}
              disabled={department === "all" || isPrinting}
              className={`ml-4 p-2 rounded ${
                department === "all" || isPrinting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isPrinting ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin mr-2" /> Generating PDFs...
                </span>
              ) : (
                "Dept. Wise PDF"
              )}
            </button>
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
                        src={"/sample.jpg"}
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
                onClick={() => handleEdit(student)}
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
