// import { useLoaderData } from "react-router-dom";
// import { useRef } from "react";
// const CardPage = () => {
//   const data = useLoaderData();
//   const cardRef = useRef();
//   //console.log(data);

//   return (
//     <div>
//       <div ref={cardRef} className="flex items-center justify-center min-h-screen bg-gray-200 ">
//         <div className="bg-white w-[600px] shadow-xl border border-gray-300">
//           <div className="bg-[#CEB8B0] text-center flex items-center justify-center py-2 px-3">
//             <img src="/PUST_Logo.svg" alt="logo" className="size-10" />
//             <h2 className="text-lg py-3 font-bold text-red-700">
//               PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
//             </h2>
//           </div>
//           <div className="flex px-3 bg-[#F7F0EE] items-center pb-5 pt-1">
//             <div>
//               <img
//                 src={data?.picture}
//                 alt="Student"
//                 className="w-24 h-24 rounded-lg border border-gray-400"
//               />
//               <div className="mt-6">
//                 <hr />
//                 <p className="text-xs">Signature of Student</p>
//               </div>
//             </div>
//             <div className="ml-4 text-sm">
//               <h2 className="uppercase text-lg font-bold underline mb-1">
//                 Student Identity Card
//               </h2>
//               <div className="mb-2">
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold">Name</p>
//                   <p className="ml-12 font-semibold">: &nbsp;{data?.Name}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold">Department</p>
//                   <p className="ml-2 font-semibold">
//                     : &nbsp;{data?.Current_Department}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold">Roll No.</p>
//                   <p className="ml-[39px] font-semibold">
//                     : &nbsp;{data?.Roll}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold">Session</p>
//                   <p className="ml-[42px] font-semibold">: &nbsp;2022-2023</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold text-red-700">Blood Group</p>
//                   <p className="font-semibold text-red-700 ml-[3px]">
//                     : &nbsp;{data?.blood_group}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold">Emergency</p>
//                   <p className="ml-[16px] font-semibold">
//                     : &nbsp;+880{data?.Mobile}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#CEB8B0] px-3 py-4 text-left text-xs">
//             <hr className="w-28" />
//             <p>Signature of Provost</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CardPage;

import React, { useRef } from "react";
import { useLoaderData } from "react-router-dom";

const CardPage = () => {
  const data = useLoaderData();
  const printRef1 = useRef();
  const printRef2 = useRef();
  const printRef3 = useRef();

  const handlePrint = (printRef) => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore the original page
  };

  return (
    <div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => handlePrint(printRef1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mr-4"
        >
          Print Card 1
        </button>
        <button
          onClick={() => handlePrint(printRef2)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mr-4"
        >
          Print Card 2
        </button>
        <button
          onClick={() => handlePrint(printRef3)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          Print Card 3
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-5">
        <div className="flex items-center justify-center   ">
          <div
            ref={printRef1}
            className="print-area rounded-xl bg-white w-[550px] shadow-xl border-2 border-gray-300"
          >
            <div className="bg-[#CEB8B0] text-center flex items-center justify-center py-2 px-3">
              <img src="/PUST_Logo.svg" alt="logo" className="size-10" />
              <h2 className="text-lg py-3 font-bold text-red-700">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex px-3 bg-[#F7F0EE] items-center pb-5 pt-1">
              <div>
                <img
                  src={data?.picture}
                  alt="Student"
                  className="w-24 h-24 rounded-lg border border-dashed border-black"
                />
                <div className="mt-6">
                  <hr />
                  <p className="text-xs">Signature of Student</p>
                </div>
              </div>
              <div className="ml-4 text-sm">
                <h2 className="uppercase text-lg font-bold underline mb-1">
                  Student Identity Card
                </h2>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Name</p>
                    <p className="ml-12 font-semibold">: &nbsp;{data?.Name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Department</p>
                    <p className="ml-2 font-semibold">
                      : &nbsp;{data?.Current_Department}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Roll No.</p>
                    <p className="ml-[39px] font-semibold">
                      : &nbsp;{data?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Session</p>
                    <p className="ml-[42px] font-semibold">: &nbsp;2022-2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-red-700">Blood Group</p>
                    <p className="font-semibold text-red-700 ml-[3px]">
                      : &nbsp;{data?.blood_group}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Emergency</p>
                    <p className="ml-[16px] font-semibold">
                      : &nbsp;+880{data?.Mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#CEB8B0] px-3 py-5 text-left text-xs">
              <hr className="w-28 mt-2" />
              <p>Signature of Provost</p>
            </div>
          </div>
        </div>

        {/* Printable ID Card 2 (Different Background Color) */}
        <div className="flex items-center justify-center ">
          <div
            ref={printRef2}
            className="bg-white w-[550px] shadow-xl border border-gray-300"
          >
            <div className="bg-[#CEB8B0] text-center flex items-center justify-center py-2 px-3">
              <img src="/PUST_Logo.svg" alt="logo" className="size-10" />
              <h2 className="text-lg py-3 font-bold text-red-700">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex px-3 bg-[#F7F0EE] items-center pb-5 pt-1">
              <div>
                <img
                  src={data?.picture}
                  alt="Student"
                  className="w-24 h-24 rounded-lg border border-dashed border-black"
                />
                <div className="mt-6">
                  <hr />
                  <p className="text-xs">Signature of Student</p>
                </div>
              </div>
              <div className="ml-4 text-sm">
                <h2 className="uppercase text-lg font-bold underline mb-1">
                  Student Identity Card
                </h2>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Name</p>
                    <p className="ml-12 font-semibold">: &nbsp;{data?.Name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Department</p>
                    <p className="ml-2 font-semibold">
                      : &nbsp;{data?.Current_Department}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Roll No.</p>
                    <p className="ml-[39px] font-semibold">
                      : &nbsp;{data?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Session</p>
                    <p className="ml-[42px] font-semibold">: &nbsp;2022-2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-red-700">Blood Group</p>
                    <p className="font-semibold text-red-700 ml-[3px]">
                      : &nbsp;{data?.blood_group}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Emergency</p>
                    <p className="ml-[16px] font-semibold">
                      : &nbsp;+880{data?.Mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#CEB8B0] px-3 py-5 text-left text-xs">
              <hr className="w-28 mt-2" />
              <p>Signature of Provost</p>
            </div>
          </div>
        </div>

        {/*  ID Card 3 */}
        <div className="flex items-center justify-center  ">
          <div
            ref={printRef3}
            className="bg-white print-area w-[550px] shadow-xl border  border-gray-300"
          >
            <div className="bg-[#CEB8B0] text-center flex items-center justify-center py-2 px-3">
              <img src="/PUST_Logo.svg" alt="logo" className="size-10" />
              <h2 className="text-lg py-3 font-bold text-red-700">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex px-3 bg-[#F7F0EE] items-center pb-5 pt-1">
              <div>
                <img
                  src={data?.picture}
                  alt="Student"
                  className="w-24 h-24 rounded-lg border border-dashed border-black"
                />
                <div className="mt-6">
                  <hr />
                  <p className="text-xs">Signature of Student</p>
                </div>
              </div>
              <div className="ml-4 text-sm">
                <h2 className="uppercase text-lg font-bold underline mb-1">
                  Student Identity Card
                </h2>
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Name</p>
                    <p className="ml-12 font-semibold">: &nbsp;{data?.Name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Department</p>
                    <p className="ml-2 font-semibold">
                      : &nbsp;{data?.Current_Department}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Roll No.</p>
                    <p className="ml-[35px] font-semibold">
                      :&nbsp;{data?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Session</p>
                    <p className="ml-[42px] font-semibold">: &nbsp;2022-2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-red-700">Blood Group</p>
                    <p className="font-semibold text-red-700 ml-[3px]">
                      : &nbsp;{data?.blood_group}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Emergency</p>
                    <p className="ml-[16px] font-semibold">
                      : &nbsp;+880{data?.Mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#CEB8B0] px-3 py-5 text-left text-xs">
              <hr className="w-28 mt-2" />
              <p>Signature of Provost</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardPage;
