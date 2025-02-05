import { useLoaderData } from "react-router-dom";

const CardPage = () => {
  const data = useLoaderData();

  //console.log(data);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-200 ">
        <div className="bg-white w-[600px] shadow-xl border border-gray-300">
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
                className="w-24 h-24 rounded-lg border border-gray-400"
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
          <div className="bg-[#CEB8B0] px-3 py-4 text-left text-xs">
            <hr className="w-28" />
            <p>Signature of Provost</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardPage;
