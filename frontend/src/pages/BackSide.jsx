import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import { remote } from "../config/config";

export default function BackSIde() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [issueDate, setIssueDate] = useState(null);

  const printRef1 = useRef();
  const printRef2 = useRef();
  console.log(printRef2);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${remote}/print-preview/${id}`); // Fix: Corrected API route
        if (!response.ok) throw new Error("Student not found");
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudent();
  }, [id]);

  const handlePrint = (printRef) => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Format the issue date if it is available
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      const day = d.getDate();
      const month = d.toLocaleString("default", { month: "long" });
      const year = d.getFullYear();
      return `${day} ${month}, ${year}`;
    }
    return "";
  };

  //console.log(issueDate);

  const studenturl = `https://student-library-card-pust.netlify.app/student-details/${id}`;
  return (
    <div>
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 absolute top-10 left-20 cursor-pointer">
          <Link to="/home/card-print" className="flex items-center">
            <ChevronLeft />
            Back
          </Link>
        </button>
      </div>
      <div className="flex items-center justify-center mt-6">
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="border border-amber-400  p-2 rounded-lg cursor-pointer"
        />
      </div>
      {/* print for non resident */}
      <div
        className="flex flex-col gap-3.5 main justify-center items-center mt-[126.72px]"
        ref={printRef1}
      >
        {/* {JSON.stringify(student)} */}
        <div className="bg-[#CEB8B0] h-[204.05px] w-[324px] px-6 py-[18.72px] shadow-lg text-center">
          <p className="text-[#783631] font-medium text-[8.36px] ">
            Issue date : {formatDate(issueDate)}
          </p>
          <p className="text-gray-900 font-medium text-[8.36px] ">
            Valid for&nbsp; 4 Years
          </p>
          {/* QR Code Container */}
          <div className="flex justify-center items-center mt-2  border border-dashed h-[49px] w-[50px] bg-[#CEB8B0] mx-auto p-[2px]">
            {student && (
              <QRCode
                value={studenturl}
                bgColor="#CEB8B0"
                className="w-full h-full"
              />
            )}
          </div>
          <p className="text-black mt-2  text-[8.26px] font-normal">
            If this card is found anywhere other than in possession of the legal
            owner, please return it to the address below:
          </p>
          <div className=" text-black mt-1.5 text-[8.26px] font-normal">
            <p className=" text-[#783631]">Registrar</p>
            <p className="text-black flex items-center justify-center ">
              <IoIosCall /> +8802588845193
            </p>
            <p className="text-black flex items-center justify-center ">
              <MdEmail className="mr-0.5" /> registraroffice@pust.ac.bd
            </p>
          </div>
        </div>
        <div>
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-xl ml-12 cursor-pointer"
            onClick={() => handlePrint(printRef1)}
          >
            Print Non Resident Card
          </button>

          {/* <button
            className="bg-blue-800 text-white px-4 py-2 rounded-xl ml-12 cursor-pointer"
            onClick={() => handlePrint(printRef2)}
          >
            Print Resident Card
          </button> */}
        </div>

        <style>
          {`
        @media print {
          button {
            display: none;
          }
            .main{
            margin-top: 0px;
            }
        }
      `}
        </style>
      </div>

      {/* print for resident */}
      <div
        className="flex flex-col gap-3.5 main justify-center items-center mt-[126.72px] "
        ref={printRef2}
      >
        {/* {JSON.stringify(student)} */}
        <div className="bg-[#CEB8B0] h-[204.05px] w-[324px] px-6 py-[18.72px] shadow-lg text-center">
          <p className="text-[#783631] font-medium text-[8.36px] ">
            Issue date : {formatDate(issueDate)}
          </p>
          <p className="text-gray-900 font-medium text-[8.36px] ">
            Valid for&nbsp; 4 Years
          </p>
          {/* QR Code Container */}
          <div className="flex justify-center items-center mt-2  border border-dashed h-[49px] w-[50px] bg-[#ffffff] mx-auto p-[2px]">
            {student && (
              <QRCode
                value={studenturl}
                bgColor="white"
                className="w-full h-full"
              />
            )}
          </div>
          <p className="text-black mt-2  text-[8.26px] font-normal">
            If this card is found anywhere other than in possession of the legal
            owner, please return it to the address below:
          </p>
          <div className=" text-black mt-1.5 text-[8.26px] font-normal">
            <p className=" text-[#783631]">Registrar</p>
            <p className="text-black flex items-center justify-center ">
              <IoIosCall /> +8802588845193
            </p>
            <p className="text-black flex items-center justify-center ">
              <MdEmail className="mr-0.5" /> registraroffice@pust.ac.bd
            </p>
          </div>
        </div>
        <div>
          {/* <button
            className="bg-blue-800 text-white px-4 py-2 rounded-xl ml-12 cursor-pointer"
            onClick={() => handlePrint(printRef1)}
          >
            Print Non Resident Card
          </button> */}

          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-xl ml-12 cursor-pointer"
            onClick={() => handlePrint(printRef2)}
          >
            Print Resident Card
          </button>
        </div>

        <style>
          {`
        @media print {
          button {
            display: none;
          }
            .main{
            margin-top: 0px;
            }
        }
      `}
        </style>
      </div>
    </div>
  );
}
