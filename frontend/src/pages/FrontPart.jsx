import { ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
const FrontPart = () => {
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
      <div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 absolute top-10 left-20 cursor-pointer">
          <Link to="/home/card-print" className="flex items-center">
            <ChevronLeft />
            Back
          </Link>
        </button>
      </div>
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
            <div className="bg-[#CEB8B0] text-center flex items-center py-2 gap-1 h-[51.59px]  pl-[16.56px]">
              <img
                src="/PUST_Logo.svg"
                alt="logo"
                className="w-[23.712px] h-[32.352px]"
              />
              <h2 className="text-[9.79px] py-[2px] font-bold text-[#6A0000]">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex bg-[#fff6e2]/59 items-center pl-[16.56px] h-[118.26px]">
              <div className="flex  flex-col ">
                <img
                  src={data?.picture}
                  alt="St"
                  className="h-[64.0512px] w-[51.6288px] mt-6 "
                />
                <div className="mt-3 w-[60.6288px]">
                  {/* <h1 className="text-[5.666px]">fardin</h1> */}
                  <img
                    src={data?.signature || "/signature.png"}
                    className="w-[52px] h-[12px] mb-[2px] object-cover"
                  />
                  <hr className="w-13" />
                  <p className="text-[5.666px] w-full font-semibold">
                    Signature of Student
                  </p>
                </div>
              </div>
              <div className="pl-[8.80px] pr-2">
                <h2 className="uppercase -mt-3 text-[9.26px] font-bold mb-[2px]">
                  Student Identity Card
                  <hr className="w-[118px]" />
                </h2>
                <div className="-space-y-[3px] text-[9.39px]">
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">
                      Name <span className=" ml-[31.37px]">:</span> &nbsp;
                    </p>
                    <p className="text-[9.399px]   font-bold">{data?.Name}</p>
                  </div>
                  {/* <div className="flex items-center">
                    <p className="text-[9.399px] font-medium">Department</p>
                    <p className="ml-[10.8px] text-[9.399px] font-medium">
                      : &nbsp;{data?.Current_Department}
                    </p>
                  </div> */}
                  <div className="flex items-start">
                    <p className="text-[9.399px] font-medium min-w-[65px]">
                      Department
                    </p>
                    <div className="flex ">
                      <p className="text-[9.399px] -ml-[5px] font-medium">
                        :&nbsp;
                      </p>
                      <p className="text-[9.399px] font-medium -space-y-4">
                        {data?.Current_Department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <p className="text-[9.399px]">Roll No.</p>
                    <p className="ml-[26.4px] text-[9.399px] font-medium">
                      : &nbsp;{data?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-medium">Session</p>
                    <p className="ml-[26.68px] text-[9.399px] font-medium">
                      : &nbsp;2023-2024
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] text-[#6A0000] font-semibold">
                      Blood Group
                    </p>
                    <p className="text-[9px] text-[#6A0000] ml-[3px] font-semibold">
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
            <div className="bg-[#CEB8B0] pt-2 text-left   h-[34.20px] pl-[16.56px]">
              <img
                src={data?.signature || "/provostDemo.png"}
                className="w-[52px] h-[12px] mb-[2px] object-cover"
              />
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

export default FrontPart;
