import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import signature from "../assets/signature.png";
const CardPage = () => {
  const data = useLoaderData();
  const printRef1 = useRef();
  // const printRef2 = useRef();

  const handlePrint = (printRef) => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
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
        {/* <button
          onClick={() => handlePrint(printRef2)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mr-4"
        >
          Print Card 2
        </button> */}
      </div>

      <section className="grid grid-cols-1 gap-4 justify-center mt-5">
        <div className="flex items-center justify-center">
          <div
            ref={printRef1}
            className="print-area  bg-white h-[204.05px] w-[324px] shadow-xl box-border"
          >
            <div className="bg-[#CEB8B0] text-center flex items-center py-2 gap-1 h-[51.59px]  pl-[26.56px]">
              <img
                src="/PUST_Logo.svg"
                alt="logo"
                className="w-[23.712px] h-[32.352px]"
              />
              <h2 className="text-[9.79px] py-[2px] font-bold text-red-700">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex bg-[#F7F0EE] items-center pl-[26.56px] h-[118.26px]">
              <div className="flex items-center justify-end flex-col pb-[2px]">
                <img
                  src={data?.picture}
                  alt="Student"
                  className="h-[64.0512px] w-[51.6288px] mt-7 "
                />
                <div className="mt-1 ">
                  {/* <h1 className="text-[5.666px]">fardin</h1> */}
                  <img
                    src={signature}
                    alt="signature"
                    className="w-[50px] h-[12px]"
                  />
                  <hr className="w-13" />
                  <p className="text-[5.666px] font-medium">
                    Signature of Student
                  </p>
                </div>
              </div>
              <div className="pl-[32.80px]">
                <h2 className="uppercase -mt-3 text-[9.26px] font-bold mb-[2px]">
                  Student Identity Card
                  <hr className="w-[118px]" />
                </h2>
                <div className="-space-y-[3px] text-[9.39px]">
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">
                      Name <span className=" ml-[31.5px]">:</span> &nbsp;
                    </p>
                    <p className="text-[9.399px]   font-bold">{data?.Name}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">Department</p>
                    <p className="ml-[7.5px] text-[9.399px] font-semibold">
                      : &nbsp;{data?.Current_Department}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">Roll No.</p>
                    <p className="ml-[24.3px] text-[9.399px] font-semibold">
                      : &nbsp;{data?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">Session</p>
                    <p className="ml-[24px] text-[9.399px] font-semibold">
                      : &nbsp;2023-2024
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] text-red-700 font-semibold">
                      Blood Group
                    </p>
                    <p className="text-[9.399px] text-red-700 ml-[3px] font-semibold">
                      : &nbsp;{data?.blood_group}
                    </p>
                  </div>
                  <div className="flex items-center ">
                    <p className="text-[9.399px] font-semibold">Emergency</p>
                    <p className="text-[9.399px] ml-[10px] font-semibold">
                      : &nbsp;+880{data?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#CEB8B0] pt-5 text-left   h-[34.20px] pl-[26.56px]">
              <hr className="w-[56px]" />
              <p className="text-[5.666px] font-semibold">
                Signature of Provost
              </p>
            </div>
          </div>
        </div>

        {/* Printable ID Card 2 (Different Background Color) */}
        {/* <div className="flex items-center justify-center ">
          <div ref={printRef2} className="bg-white w-[600px] shadow-xl ">
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
        </div> */}
      </section>
    </div>
  );
};

export default CardPage;
