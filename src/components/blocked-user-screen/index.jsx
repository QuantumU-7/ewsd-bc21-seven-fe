"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import uniImage from "@/public/images/uni.png";

const BlockedUserScreen = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-[50vw] h-[30vw]">
        <CardContent className="flex p-0 justify-between items-center h-full">
          <div className="w-1/2 p-[4vw]">
            <div className="flex flex-col items-center justify-center mb-9">
              <p className="text-2xl font-bold mb-2 text-primary">
                Sorry
              </p>
              <p className="text-sm text-center mt-5">
                Your account has been suspended. Please contact QA Manager for further details.
              </p>
            </div>
          </div>
          <div className="w-1/2 h-full relative flex justify-center">
            <Image
              src={uniImage}
              alt="university logo"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-l-none rounded-r-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockedUserScreen;
