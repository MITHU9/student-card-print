import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { remote } from "../config/config";

const CombinedCardPrint = () => {
  const frontPrintRef = useRef();
  const backPrintRef = useRef();
  const { id } = useParams();
  const [issueDate, setIssueDate] = useState(null);
  const frontData = useLoaderData();
  const [backData, setBackData] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${remote}/print-preview/${id}`);
        if (!response.ok) throw new Error("Student not found");
        const data = await response.json();
        setBackData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudent();
  }, [id]);

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

  const handleBothPrint = (frontRef, backRef, date) => {
    const frontContent = frontRef.current;
    const backContent = backRef.current;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = frontContent.innerHTML + backContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
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
          className="border border-amber-400 p-2 rounded-lg cursor-pointer"
        />
      </div>

      <div className="flex justify-center my-5">
        <button
          onClick={() =>
            handleBothPrint(frontPrintRef, backPrintRef, issueDate)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 mr-4"
          disabled={!issueDate}
        >
          Print Both Sides
        </button>
      </div>

      {/* Hidden front side template */}
      <div className="">
        {/* <div ref={frontPrintRef}>
          <div className="bg-white h-[204.05px] w-[324px] shadow-xl box-border">
            <div className="bg-[#CEB8B0] text-center flex items-center py-2 gap-1 h-[51.59px] pl-[26.56px]">
              <img
                src="/PUST_Logo.svg"
                alt="logo"
                className="w-[23.712px] h-[32.352px]"
              />
              <h2 className="text-[9.79px] py-[2px] font-bold text-[#783631]">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex bg-[#F7F0EE] items-center pl-[26.56px] h-[118.26px]">
              <div className="flex flex-col pb-[2px]">
                <img
                  src={frontData?.picture || "/passport.png"}
                  alt="Student"
                  className="h-[64.0512px] w-[51.6288px] mt-7"
                />
                <div className="mt-1 w-[60.6288px]">
                  <img
                    src={frontData?.signature || "/signature.png"}
                    className="w-[52px] h-[12px] mb-[2px] object-cover"
                  />
                  <hr className="w-13" />
                  <p className="text-[5.666px] w-full font-semibold">
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
                      Name <span className="ml-[31.37px]">:</span> &nbsp;
                    </p>
                    <p className="text-[9.399px] font-bold">
                      {frontData?.Name}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <p className="text-[9.399px] min-w-[65px] font-medium">
                      Department
                    </p>
                    <div className="flex">
                      <p className="text-[9.399px] -ml-[5px] font-medium">
                        :&nbsp;
                      </p>
                      <p className="text-[9.399px] font-medium">
                        {frontData?.Current_Department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px]">Roll No.</p>
                    <p className="ml-[26.4px] text-[9.399px] font-medium">
                      : &nbsp;{frontData?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-medium">Session</p>
                    <p className="ml-[26.68px] text-[9.399px] font-medium">
                      : &nbsp;2023-2024
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] text-[#783631] font-semibold">
                      Blood Group
                    </p>
                    <p className="text-[9px] text-[#783631] ml-[3px] font-semibold">
                      : &nbsp;{frontData?.blood_group}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">Emergency</p>
                    <p className="text-[9.399px] ml-[10px] font-semibold">
                      : &nbsp;+880{frontData?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#CEB8B0] pt-2 text-left h-[34.20px] pl-[26.56px]">
              <img
                src={frontData?.signature || "/provostDemo.png"}
                className="w-[52px] h-[12px] mb-[2px] object-cover"
              />
              <hr className="w-[56px]" />
              <p className="text-[5.666px] font-semibold">
                Signature of Provost
              </p>
            </div>
          </div>
        </div> */}
        <div className="flex items-center justify-center">
          <div
            ref={frontPrintRef}
            className="print-area  bg-white h-[204.05px] w-[324px] shadow-xl box-border"
          >
            <div className="bg-[#CEB8B0] text-center flex items-center py-2 gap-1 h-[51.59px]  pl-[26.56px]">
              {/* pl-[26.56px] */}
              <img
                src="/PUST_Logo.svg"
                alt="logo"
                className="w-[23.712px] h-[32.352px]"
              />
              <h2 className="text-[9.79px] mt-1 font-bold text-[#783631]">
                PABNA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </h2>
            </div>
            <div className="flex bg-[#fff6e2]/59  items-center pl-[26.56px] h-[118.26px]">
              <div className=" ">
                <img
                  src={frontData?.picture}
                  alt="St"
                  className="h-[68.28px] w-[60.28px]"
                />
              </div>
              {/* h-[64.0512px]  w-[51.6288px]*/}
              <div className="pl-[20.80px] pr-2">
                <h2 className="uppercase -mt-3 text-[9.26px] font-bold mb-[2px]">
                  Student Identity Card
                  <hr className="w-[118px]" />
                </h2>
                <div className="-space-y-[3px] text-[9.39px]">
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-semibold">
                      Name <span className=" ml-[31.37px]">:</span> &nbsp;
                    </p>
                    <p className="text-[9.399px]   font-bold">
                      {frontData?.Name}
                    </p>
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
                        {frontData?.Current_Department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <p className="text-[9.399px]">Roll No.</p>
                    <p className="ml-[26.4px] text-[9.399px] font-medium">
                      : &nbsp;{frontData?.Roll}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] font-medium">Session</p>
                    <p className="ml-[26.68px] text-[9.399px] font-medium">
                      : &nbsp;2023-2024
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-[9.399px] text-[#783631] font-semibold">
                      Blood Group
                    </p>
                    <p className="text-[9px] text-[#783631] ml-[3px] font-semibold">
                      : &nbsp;{frontData?.blood_group}
                    </p>
                  </div>
                  <div className="flex items-center ">
                    <p className="text-[9.399px] font-semibold">Emergency</p>
                    <p className="text-[9.399px] ml-[10px] font-semibold">
                      : &nbsp;+880{frontData?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div className="bg-[#CEB8B0] pt-2 text-left flex justify-between items-center   h-[34.20px] px-[26.56px]">
              <div className=" w-[60.6288px]">
                {/* <h1 className="text-[5.666px]">fardin</h1> */}
                <img
                  src={frontData?.signature || "/signature.png"}
                  className="w-[52px] h-[12px] mb-[2px] object-cover "
                />
                <hr className="w-14" />
                <p className="text-[5.666px] w-full font-semibold mb-1">
                  Signature of Student
                </p>
              </div>

              <div>
                <img
                  src={frontData?.signature || "/provostDemo.png"}
                  className="w-[52px] h-[12px] mb-[2px] object-cover "
                />
                <hr className="w-[56px]" />
                <p className="text-[5.666px] font-semibold mb-1">
                  Signature of Provost
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden back side template */}
      <div className="mt-10">
        <div ref={backPrintRef}>
          <div className="bg-[#CEB8B0] h-[204.05px] w-[324px] px-6 py-[18.72px] shadow-lg text-center">
            <p className="text-[#783631] font-medium text-[8.36px]">
              Issue date : {formatDate(issueDate)}
            </p>
            <p className="text-gray-900 font-medium text-[8.36px]">
              Valid for&nbsp; 4 Years
            </p>
            <div className="flex justify-center items-center mt-2 border border-dashed h-[45.5424px] w-[45.5808px] bg-[#CEB8B0] mx-auto p-[2px]">
              {backData && (
                <QRCode
                  value={`http://103.121.143.52/student-details/${id}`}
                  bgColor="#CEB8B0"
                  className="w-full h-full"
                />
              )}
            </div>
            <p className="text-black mt-2 text-[8.26px] font-normal">
              If this card is found anywhere other than in possession of the
              legal owner, please return it to the address below:
            </p>
            <div className="text-black mt-1.5 text-[8.26px] font-normal">
              <p className="text-[#783631]">Registrar</p>
              <p className="text-black flex items-center justify-center">
                <IoIosCall /> +8802588845193
              </p>
              <p className="text-black flex items-center justify-center">
                <MdEmail className="mr-0.5" /> registraroffice@pust.ac.bd
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedCardPrint;
