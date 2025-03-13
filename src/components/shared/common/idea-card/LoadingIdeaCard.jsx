import React from "react";

const LoadingIdeaCard = () => {
  return (
    <div className="cursor-wait">
      <div className="flex flex-col lg:flex-row rounded-md overflow-hidden bg-white shadow-lg animate-pulse">
        <div className="flex-1 p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-8 w-48 bg-gray-300 rounded"></div>
          </div>

          <div className="h-20 bg-gray-300 rounded"></div>
        </div>

        <div className="flex-1">
          <div className="w-full h-[345px] bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIdeaCard;
