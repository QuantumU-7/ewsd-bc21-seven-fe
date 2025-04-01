import { extractTextFromFirstP } from "@/utils/textContent";
import Image from "next/image";
import DefaultThumbnail from "@/public/images/default.png";
import { convertBase64ToImage } from "@/utils/image";
import { Eye, Heart } from "@phosphor-icons/react";
import { formatDate } from "@/utils/common";

const IdeaCard = ({
  id,
  title,
  description,
  image,
  posted_At,
  user,
  like_count,
  category,
  view_count,
  dept_name
}) => {

  console.log({posted_At})
  return (
    <div className="cursor-pointer">
      <div className="flex flex-col lg:flex-row rounded-md overflow-hidden bg-white shadow-lg">
        <div className="flex-1 p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xl mt-4 hidden">{id}</p>
            <h1 className="text-3xl text-primary font-bold line-clamp-1">
              {title}
            </h1>
            <div className="flex items-center justify-between text-gray-600 text-sm mt-4">
              <div className="font-medium">By <span className="font-bold">{user}</span> from <b>{dept_name}</b></div>
              <span>{formatDate(posted_At)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-700 text-sm rounded-b-md">
              <span className="bg-primary text-white px-3 py-1 rounded-md text-xs">
                {category}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Heart size={22} />
                  <span>{like_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={22} />
                  <span>{view_count}</span>
                </div>
              </div>
            </div>
            
          </div>

          <p className="text-gray-500 text-ellipsis line-clamp-3">
            {extractTextFromFirstP(description)}
          </p>
        </div>

        <div className="flex-1">
          {image ? (
            <Image
              className="w-full h-[345px] object-cover"
              src={convertBase64ToImage(image)}
              width={300}
              height={200}
              alt={title}
            />
          ) : (
            <Image
              className="w-full h-[345px] object-cover"
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
