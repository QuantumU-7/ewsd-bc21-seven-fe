import { extractTextFromFirstP } from "@/utils/textContent";
import Image from "next/image";
import DefaultThumbnail from "@/public/images/default.png";

const IdeaCard = ({ id, title, description, image }) => {
  return (
    <div className="cursor-pointer">
      <div className="flex flex-col lg:flex-row rounded-md overflow-hidden bg-white shadow-lg">
        <div className="flex-1 p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xl mt-4">{id}</p>
            <h1 className="text-3xl text-primary font-bold">{title}</h1>
          </div>

          <p className="text-gray-500 text-ellipsis line-clamp-3">{extractTextFromFirstP(description)}</p>
        </div>

        <div className="flex-1">
          {image ? (
            <Image
              className="w-full"
              src={image}
              width={300}
              height={200}
              alt={title}
            />
          ) : (
            <Image
              className="w-full"
              src={DefaultThumbnail}
              width={300}
              height={200}
              alt={title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
