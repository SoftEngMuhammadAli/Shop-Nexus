import React from "react";

const DashboardTitleTile = ({ title, buttonTitle, onClick }) => {
  return (
    <div className="flex flex-row items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
      <button
        onClick={onClick}
        className="text-black px-4 py-1 rounded hover:bg-gray-200 transition hover:text-blue-500 hover:cursor-pointer"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default DashboardTitleTile;
