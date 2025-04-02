"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useUsers } from "@/providers/UsersContext";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { DEPARTMENT_DATA, USER_ROLES } from "@/constants/common";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserById } from "@/services/userManagementService";
import { ADMIN } from "@/constants/routes";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
    department: z.enum(["1", "2", "3", "4"]).transform(Number),
    userRole: z.enum(["1", "2", "3", "4"]).transform(Number),
    loginId: z.string().min(1, "Login ID is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function CreateNewUserForm({ isEditing = false }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      department: null,
      userRole: null,
      loginId: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { loading, addUser, editUser } = useUsers();
  const pathname = usePathname();
  const userId = pathname.split("/").pop();
  console.log({ userId });

  const fetchUserById = async () => {
    try {
      const userData = await getUserById(userId);
      form.setValue("name", userData.username);
      form.setValue("phone", userData.phone);
      form.setValue("department", userData.department.id.toString());
      form.setValue("userRole", userData.role.id.toString());
      form.setValue("loginId", userData.loginId);
      form.setValue("email", userData.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (isEditing) {
      fetchUserById();
    }
  }, []);

  async function onSubmit(values) {
    if (isEditing) {
      await editUser(userId,values);
      router.push(ADMIN.USERS)
    } else {
      await addUser(values);
    }
    form.reset();
  }

  console.log({role: form.watch('userRole')});

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-xl font-bold mb-5">
          {isEditing ? "Update" : "Create New"} User
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {DEPARTMENT_DATA.find(
                              (dept) =>
                                dept.id === parseInt(form.watch("department"))
                            )?.name || "Select Department"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENT_DATA.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role">
                            {USER_ROLES.find(
                              (role) => role.id === parseInt(form.watch("userRole"))
                            )?.name || "Select Role"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {USER_ROLES.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="loginId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login ID *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Default Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Default Password *</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 justify-end w-full">
              <Link href="/admin/users">
                <Button type="button" variant="ghost" className="col-span-2">
                  Back
                </Button>
              </Link>
              <Button type="submit" className="col-span-2">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  `${isEditing ? 'Update' : 'Add New'} User`
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
