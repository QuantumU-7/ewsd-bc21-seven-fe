import Image from "next/image";
import React from "react";

const IdeaCard = ({ id, title, description, image }) => {
  return (
    <div className="cursor-pointer">
      <div className="flex flex-col lg:flex-row rounded-md overflow-hidden bg-white shadow-lg">
        <div className="flex-1 p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xl mt-4">{id}</p>
            <h1 className="text-3xl text-primary">{title}</h1>
          </div>

          <p className="text-gray-500">{description}</p>
        </div>

        <div className="flex-1">
          {image ? (
            <Image className="w-full" src={image} width={300} height={200} />
          ) : (
            <p className="text-gray-500">No image provided</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
