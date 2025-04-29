"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCategory } from "@/providers/CategoryContext";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

const CategoryManagementForm = ({ isEditing = false }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const params = useParams();

  const { loading, addCategory, editCategory, editingCategory } = useCategory();

  useEffect(() => {
    if (params.id === undefined) {
      setValue("name", "");
    } else {
      editCategory !== "" && setValue("name", editingCategory);
    }
  }, [setValue, editingCategory]);

  const onSubmit = (data) => {
    if (isEditing) {
      editCategory(parseInt(params.id), data.name);
    } else {
      addCategory(data.name);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h1>{isEditing ? "Update" : "Create New"} Category</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-gray-400" htmlFor="name">
              Name
            </label>
            <Input
              placeholder="Category name"
              {...register("name")}
              name="name"
              type="text"
              id="name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-5 flex gap-5 justify-end">
            <Link href="/admin/categories">
              <Button variant="ghost" type="button">
                Back
              </Button>
            </Link>
            {isEditing ? (
              <Button type="submit">{loading ? "Updating" : "Update"}</Button>
            ) : (
              <Button type="submit">{loading ? "Creating" : "Submit"}</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CategoryManagementForm;
