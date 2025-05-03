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
import { toast } from "sonner";

const ForgotPasswordForm = () => {
  const [validEmail, setValidEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEmailSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      await emailOtpService(values.email);
      setValidEmail(values.email);
      toast.success("OTP code sent to your email.");
    } catch (error) {
      toast.error("Failed to send OTP code.");
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    try {
      await passwordResetService(
        validEmail,
        values.OTP,
        values.newPassword
      );

      toast.success("Password reset successfully.");
      router.push("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full mx-6 max-w-3xl">
        <CardContent className="flex justify-center flex-col lg:flex-row p-0 lg:justify-between items-center h-[550px]">
          <div className="w-full lg:w-1/2 p-[4vw]">
            <div className="flex flex-col items-center justify-center mb-9">
              <p className="text-2xl font-bold mb-2 text-primary">
                Forgot Password
              </p>
              <p className="text-tertiary">
                {validEmail
                  ? "Enter the OTP and set a new password."
                  : "OTP code will be sent to your email."}
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
          <div className="lg:w-1/2 relative justify-center hidden lg:flex h-[550px]">
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
