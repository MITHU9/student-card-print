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

import { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
export default function BackSIde() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `https://library-card-backend.vercel.app/print-preview/${id}`
        ); // Fix: Corrected API route
        if (!response.ok) throw new Error("Student not found");
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudent();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  //console.log(id);

  const studenturl = `https://student-library-card-pust.netlify.app/student-details/${id}`;
  return (
    <div className="flex main justify-center mt-[126.72px] ">
      {/* {JSON.stringify(student)} */}
      <div className="bg-[#CEB8B0] h-[204.05px] w-[324px] px-6 py-[26.72px] shadow-lg text-center">
        <p className="text-red-900 font-bold text-[8.36px]">
          Issue date : 26 October, 2024
        </p>
        <p className="text-gray-900 font-bold text-[8.36px]">
          Validity for : 5 Years
        </p>
        {/* <div className="flex justify-center items-center my-4 border border-dashed size-[90px] bg-white mx-auto p-1">
          {student?.qrCode && (
            <img
              src={student.qrCode}
              alt="QR Code"
              className="text-black text-7xl"
            />
          )}

        </div> */}
        {/* QR Code Container */}
        <div className="flex justify-center items-center mt-2  border border-dashed size-[40px] bg-white mx-auto p-[2px]">
          {student && <QRCode value={studenturl} size={40} />}
        </div>
        <p className="text-black text-sm font-semibold text-[8.26px] mt-[20.29px]">
          If this card is found anywhere other than in possession of the legal
          owner, please return it to the address below:
        </p>
        <div className="mt-4 text-black text-[8.26px]">
          <p className="font-bold text-red-800">Registrar</p>
          <p className="text-gray-800 flex items-center justify-center font-semibold">
            <IoIosCall /> +8802588845193
          </p>
          <p className="text-gray-800 flex items-center justify-center font-semibold">
            <MdEmail className="mr-0.5 mt-0.5" /> registraroffice@pust.ac.bd
          </p>
        </div>
      </div>
      <div>
        <button
          className="bg-blue-800 text-white px-4 py-2 roundex-xl "
          onClick={handlePrint}
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
  );
}
