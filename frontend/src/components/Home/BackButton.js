import React from "react";

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center p-1 space-x-2 text-white border-none rounded-md cursor-pointer bg-primary2 hover:bg-cyan-400 focus:outline-none"
  >
    <ion-icon name="arrow-back" className="text-white"></ion-icon>
    Back
  </button>
);

export default BackButton;
