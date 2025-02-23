import React from "react";

const CategoryCard = ({ categoryName, deptName }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-2 justify-center cursor-pointer hover:shadow-xl transition-all duration-150">
      <p className="uppercase text-gray-400">{deptName}</p>
      <h2 className="text-primary text-lg font-bold">{categoryName}</h2>
    </div>
  );
};

export default CategoryCard;
