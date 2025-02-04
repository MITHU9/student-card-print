import { BsQrCode } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export default function BackSIde() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#C5B5A2] w-[600px] p-6 shadow-lg text-center">
        <p className="text-red-900 font-bold">Validity Date : December, 2027</p>
        <div className="flex justify-center items-center  my-4 border border-dashed size-[90px] bg-white mx-auto p-1">
          <BsQrCode className="text-black  text-7xl" />
        </div>
        <p className="text-black text-sm font-semibold">
          If this card is found anywhere other than in possession of the legal
          owner, please return it to the address below:
        </p>
        <div className="mt-4 text-black text-sm">
          <p className="font-bold">Registrar</p>
          <p className="text-gray-800 flex items-center justify-center font-semibold">
            <IoIosCall /> +8802588845193
          </p>
          <p className="text-gray-800 flex items-center justify-center font-semibold">
            <MdEmail className="mr-0.5" /> registeroffice@pust.ac.bd
          </p>
        </div>
      </div>
    </div>
  );
}
