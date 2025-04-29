"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import uniImage from "@/public/images/uni.png";
import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/authentication";
import { redirectByRole } from "@/utils/login";

const ForgotPasswordForm = () => {
  const me  = getUser();
  return (
    <div className="flex  justify-center items-center h-screen">
      <Card className="w-full mx-6 max-w-3xl">
        <CardContent className="flex flex-col lg:flex-row p-0 justify-center lg:justify-between items-center h-[388px]">
          <div className="w-full lg:w-1/2 p-7">
            <div className="flex flex-col items-center justify-center mb-9">
              <p className="text-2xl font-bold mb-2 text-primary">
                Welcome {me?.firstname + " " + me?.lastname}
              </p>
              <p className="text-sm text-center">
                You are about to make our university better by sharing you ideas and insights.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Button>
                <Link href={redirectByRole(me?.role?.id) || "/"} className="text-sm text-white">
                  Start Contributing
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative justify-center hidden lg:flex h-[388px]">
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

export default ForgotPasswordForm;
