// import { BsQrCode } from "react-icons/bs";
// import { IoIosCall } from "react-icons/io";
// import { MdEmail } from "react-icons/md";

// export default function BackSIde() {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-[#CEB8B0] w-[600px] p-6 shadow-lg text-center">
//         <p className="text-red-900 font-bold">Issue date : 26 October, 2024</p>
//         <p className="text-gray-900 font-bold">Validity for : 5 Years</p>
//         <div className="flex justify-center items-center  my-4 border border-dashed size-[90px] bg-white mx-auto p-1">
//           <BsQrCode className="text-black  text-7xl" />
//         </div>
//         <p className="text-black text-sm font-semibold">
//           If this card is found anywhere other than in possession of the legal
//           owner, please return it to the address below:
//         </p>
//         <div className="mt-4 text-black text-sm">
//           <p className="font-bold text-red-800">Registrar</p>
//           <p className="text-gray-800 flex items-center justify-center font-semibold">
//             <IoIosCall /> +8802588845193
//           </p>
//           <p className="text-gray-800 flex items-center justify-center font-semibold">
//             <MdEmail className="mr-0.5 mt-0.5" /> registraroffice@pust.ac.bd
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { remote } from "../config/config";

export default function BackSIde() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [issueDate, setIssueDate] = useState(null);

  const printRef1 = useRef();

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
      <div className="flex main justify-center mt-[126.72px] " ref={printRef1}>
        {/* {JSON.stringify(student)} */}
        <div className="bg-[#CEB8B0] h-[204.05px] w-[324px] px-6 py-[18.72px] shadow-lg text-center">
          <p className="text-red-900 font-medium text-[8.36px] ">
            Issue date : {formatDate(issueDate)}
          </p>
          <p className="text-gray-900 font-medium text-[8.36px] ">
            Valid for&nbsp; 4 Years
          </p>
          {/* QR Code Container */}
          <div className="flex justify-center items-center mt-2  border border-dashed h-[45.5424px] w-[45.5808px] bg-[#CEB8B0] mx-auto p-[2px]">
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
            <p className=" text-red-800">Registrar</p>
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
            Print Back Part
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
