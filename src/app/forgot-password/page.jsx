"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import uniImage from "@/public/images/uni.png";
import { EmailForm } from "./components/EmailForm";
import { PasswordForm } from "./components/PasswordForm";

const ForgotPasswordPage = () => {
  const [validEmail, setValidEmail] = useState(false);

  const handleEmailSubmit = (values) => {
    if (values.email) {
      setValidEmail(true);
    }
  };

  const handlePasswordSubmit = (values) => {
    console.log("Password reset submitted:", values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[50vw] h-[30vw]">
        <CardContent className="flex p-0 justify-between items-center h-full">
          <div className="w-1/2 p-[4vw]">
            <div className="flex flex-col items-center justify-center mb-9">
              <p className="text-2xl font-bold mb-2 text-primary">
                Forgot Password
              </p>
              <p className="text-tertiary">
                {validEmail
                  ? "Enter the OTP and set a new password."
                  : "A new password will be sent to your email."}
              </p>
            </div>
            {!validEmail ? (
              <EmailForm onSubmit={handleEmailSubmit} />
            ) : (
              <PasswordForm onSubmit={handlePasswordSubmit} />
            )}
            <div className="mt-4 text-center">
              <Link href="/login" className="text-primary text-sm">
                Back to Login
              </Link>
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

export default ForgotPasswordPage;
