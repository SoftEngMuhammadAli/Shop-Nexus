import React from "react";

export const ShowError = ({ error }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center max-w-xl mx-auto mt-6"
      role="alert"
    >
      <span>
        <strong className="font-bold">Error: </strong>
        {error}
      </span>
      <button
        onClick={() => window.location.reload()}
        className="ml-4 text-red-700 hover:text-red-900 font-bold"
      >
        ✖
      </button>
    </div>
  );
};
