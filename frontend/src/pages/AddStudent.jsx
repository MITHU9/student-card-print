import { useState } from "react";
import Papa from "papaparse";
import { remote } from "../config/config";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AddStudent = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
        },
        header: true,
      });
    }
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert("Please select a CSV file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", csvFile);

    //console.log(formData);

    try {
      await axiosSecure.post(`${remote}/api/students/upload`, formData);
      alert("File uploaded successfully!");
      setCsvFile(null);
      setData([]);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Upload failed");
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <nav className="flex justify-center gap-5 py-5">
          <Link
            to="/home/card-print"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print Card
          </Link>
        </nav>
      </header>
      <div className=" bg-white rounded-lg shadow-md mt-10 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-4">
              Upload Student data (.CSV file)
            </h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mb-4 border border-gray-300 p-2 rounded-md mr-2 cursor-pointer"
            />
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <div className=" flex flex-col p-4 items-end">
            <p className="w-1/2 mt-4 text-sm font-semibold text-red-600">
              <span className="text-gray-700 font-bold text-xl">Note:</span> In
              order to upload student data, you need to have a{" "}
              <strong className="italic">CSV file</strong> with the following
              {""}
              <strong> columns name</strong> in the first row with{" "}
              <strong>case sensitive</strong> in this file.
            </p>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">Download sample CSV file:</h3>
              <a
                href="/demo.csv"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                download
              >
                Download
              </a>
            </div>
          </div>
        </div>

        {data.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold">Preview:</h3>
            <table className="border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="border border-gray-300 px-2">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border border-gray-300 px-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
