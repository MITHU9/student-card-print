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

import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function BackSIde() {
  const { id } = useParams();
  // const [student, setStudent] = useState(null);
  // console.log(id);
  // useEffect(() => {
  //   fetch(`https://library-card-backend.vercel.app/fetch-student/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setStudent(data));
  // }, [id]);

  // if (!student) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#CEB8B0] w-[600px] p-6 shadow-lg text-center">
        <p className="text-red-900 font-bold">Issue date : 26 October, 2024</p>
        <p className="text-gray-900 font-bold">Validity for : 5 Years</p>
        <div className="flex justify-center items-center my-4 border border-dashed size-[90px] bg-white mx-auto p-1">
          {/* <img
            src={student.qrCode}
            alt="QR Code"
            className="text-black text-7xl"
          /> */}
        </div>
        <p className="text-black text-sm font-semibold">
          If this card is found anywhere other than in possession of the legal
          owner, please return it to the address below:
        </p>
        <div className="mt-4 text-black text-sm">
          <p className="font-bold text-red-800">Registrar</p>
          <p className="text-gray-800 flex items-center justify-center font-semibold">
            <IoIosCall /> +8802588845193
          </p>
          <p className="text-gray-800 flex items-center justify-center font-semibold">
            <MdEmail className="mr-0.5 mt-0.5" /> registraroffice@pust.ac.bd
          </p>
        </div>
      </div>
    </div>
  );
}
