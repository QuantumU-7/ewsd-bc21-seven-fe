import React from "react";

const CategoryCard = ({ categoryName, title }) => {
  return (
    <div className="bg-white h-full rounded-md shadow-md p-4 flex flex-col gap-2 justify-center cursor-pointer hover:shadow-xl transition-all duration-150">
      <p className="uppercase text-gray-400">{categoryName}</p>
      <h2 className="text-primary text-lg font-bold">{title}</h2>
    </div>
  );
};

export default CategoryCard;
