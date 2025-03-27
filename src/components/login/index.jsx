"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import uniImage from "@/public/images/uni.png";
import {jwtDecode} from "jwt-decode";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { loginService } from "@/services/loginService";
import { getMe } from "@/services/authService";
import LoadingButton from "../shared/common/Button";
import { TokenKeys } from "@/constants/tokenKeys";
import Cookies from "js-cookie";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    setError(null);

    try {
      const data = await loginService(values.username, values.password);
      localStorage.setItem(TokenKeys.accesstoken, data.access_token);
      localStorage.setItem(TokenKeys.refreshtoken, data.refresh_token);
      const me = await getMe();
      localStorage.setItem(TokenKeys.user, JSON.stringify(me));

      Cookies.set("accesstoken", data.access_token, { expires: 1 }); // 1 day expiry
      Cookies.set("refreshtoken", data.refresh_token, { expires: 7 });

      const decodedToken = jwtDecode(data.access_token);
      redirectAfterLogin(decodedToken.lastlogin);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const redirectAfterLogin = (lastlogin) => {
    if (lastlogin === null) {
      router.push("/welcome");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-[50vw] h-[30vw]">
        <CardContent className="flex p-0 justify-between items-center h-full">
          <div className="w-1/2 p-[4vw]">
            <div className="flex flex-col items-center justify-center mb-4">
              <p className="text-2xl font-bold uppercase mb-2 text-primary">
                Welcome
              </p>
              <p className="text-tertiary">Login to your account</p>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  href={"/forgot-password"}
                  className="cursor-pointer text-primary text-sm flex justify-end"
                >
                  Forgot Password?
                </Link>
                <LoadingButton label="Login" isLoading={loading} />
              </form>
            </Form>
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

export default LoginForm;
