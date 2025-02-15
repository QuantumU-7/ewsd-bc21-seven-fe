"use client"; // Ensure this component runs on the client side

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import uniImage from "@/public/images/uni.png";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values) {
    console.log("Form values:", values);
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[50vw] h-[30vw]">
          <CardContent className="flex p-0 justify-between items-center h-full">
            <div className="w-1/2 p-[4vw] ">
              <div className="flex flex-col items-center justify-center mb-4">
                <p className="text-2xl font-bold uppercase mb-2 text-primary">
                  Welcome
                </p>
                <p className="text-tertiary">Login to your account</p>
              </div>
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
                        <FormLabel cl>Username</FormLabel>
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
                          <Input placeholder="password" {...field} />
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
                  <Button className="w-full my-2 bg-button-primary text-white ">
                    Login
                  </Button>
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
    </>
  );
};

export default LoginPage;
