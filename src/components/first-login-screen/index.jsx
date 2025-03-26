"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import uniImage from "@/public/images/uni.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-[50vw] h-[30vw]">
        <CardContent className="flex p-0 justify-between items-center h-full">
          <div className="w-1/2 p-[4vw]">
            <div className="flex flex-col items-center justify-center mb-9">
              <p className="text-2xl font-bold mb-2 text-primary">
                Welcome Eaint
              </p>
              <p className="text-sm text-center">
                You are about to make our university better by sharing you ideas and insights.
              </p>
            </div>
            <div className="mt-4 text-center">
              <Button>
                <Link href="/" className="text-sm text-white">
                  Start Contributing
                </Link>
              </Button>
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

export default ForgotPasswordForm;
