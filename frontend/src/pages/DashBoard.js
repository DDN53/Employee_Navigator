import React from "react";
import {
  LeaveseUpdate,
  LiabilitiesUpdate,
  AttendanceUpdate,
  EarningUpdate,
  DeductionUpdate,
} from "../components";

const DashBoard = () => {
  return (
    <div
      className="flex flex-row bg-orange-100 min-w-fit"
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col items-start w-2/5 min-h-screen bg-red-600 ">
        {/* Content for bg-red-600 div */}
        <div className="flex flex-row w-11/12 m-5 mr-5 bg-blue-600 h-1/4">
          Attendance
        </div>
        <div className="flex flex-row w-11/12 m-5 bg-blue-600 h-1/4">
          Attendance
        </div>
        <div className="flex flex-row w-11/12 m-5 bg-blue-600 h-1/4">
          Attendance
        </div>
        <div className="flex flex-row items-center w-11/12 m-5 bg-blue-600 h-1/4">
          Attendance
        </div>
      </div>

      <div
        className="flex flex-row flex-wrap w-2/3 min-h-screen ml-5 bg-orange-700"
        style={{ overflow: "hidden" }}
      >
        <div
          className="flex flex-row justify-between flex-grow w-2/3 m-5 bg-red-800 h-1/5"
          style={{ overflow: "hidden" }}
        >
          <div className="w-5/12 text-center p-28 bg-lime-700">Attendance</div>
          <div className="w-2/4 text-center p-28 bg-lime-700">Attendance</div>
        </div>

        <div
          className="flex flex-row justify-between flex-grow w-2/3 mx-5 bg-red-800 h-1/5"
          style={{ overflow: "hidden" }}
        >
          <div className="w-5/12 gap-4 text-center p-28 bg-lime-700">
            Attendance
          </div>
          <div className="w-2/4 gap-4 text-center p-28 bg-lime-700">
            Attendance
          </div>
        </div>

        <div
          className="flex flex-row justify-between flex-grow w-2/3 m-5 bg-red-800 h-1/5"
          style={{ overflow: "hidden" }}
        >
          <div className="w-5/12 text-center p-28 bg-lime-700">Leaves</div>
          <div className="w-2/4 text-center p-28 bg-lime-700">Leaves</div>
        </div>

        <div
          className="flex flex-row justify-between flex-grow w-2/3 mx-5 bg-red-800 h-1/5"
          style={{ overflow: "hidden" }}
        >
          <div className="w-5/12 gap-4 text-center p-28 bg-lime-700">
            Leaves
          </div>
          <div className="w-2/4 gap-4 text-center p-28 bg-lime-700">Leaves</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
