"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import uniImage from "@/public/images/uni.png";
import { EmailForm } from "../../components/forgot-password/components/EmailForm";
import { PasswordForm } from "../../components/forgot-password/components/PasswordForm";
import { emailOtpService } from "@/services/emailOtpService";
import { passwordResetService } from "@/services/passwordResetService";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [validEmail, setValidEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEmailSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await emailOtpService(values.email);
      setValidEmail(values.email);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await passwordResetService(
        validEmail,
        values.OTP,
        values.newPassword
      );
      router.push("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
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
              <EmailForm onSubmit={handleEmailSubmit} isLoading={isLoading} />
            ) : (
              <PasswordForm
                onSubmit={handlePasswordSubmit}
                isLoading={isLoading}
              />
            )}
            <div className="mt-4 text-center">
              <Link href="/login" className="text-primary text-sm">
                Back to Login
              </Link>
            </div>
            {error && <p className="text-center text-destructive">{error}</p>}
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
