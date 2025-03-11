"use client";
import IdeaTable from "./components/IdeaTable";

const MyIdeasListForm = () => {
  return (
    <div className="max-w-7xl h-[77.5vh] overflow-auto mx-auto space-y-8 my-8 px-4">
      <h2 className="text-2xl font-bold my-4">My Ideas</h2>

      {/** Table */}
      <IdeaTable />
    </div>
  );
};

export default MyIdeasListForm;
