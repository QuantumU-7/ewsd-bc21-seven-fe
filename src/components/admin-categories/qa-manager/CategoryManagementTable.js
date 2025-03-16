"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useCategory } from "@/providers/CategoryContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import CommonPagination from "@/components/shared/common/Pagination";

export default function CategoryManagementTable() {
  const router = useRouter();
  const {
    categories,
    loading,
    fetchCategories,
    setEditingCategory,
    deleteSelectedCategory,
    totalPages,
  } = useCategory();

  useEffect(() => {
    categories.length === 0 && fetchCategories(1);
  }, []);

  const handleClickEditingCategory = (id, name) => {
    console.log({ name });
    setEditingCategory(name);
    router.push(`/admin/categories/${id}`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link href={"/admin/categories/new"}>
            <Button className="bg-black text-white">Add New Category</Button>
          </Link>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <p>Loading...</p>
            ) : (
              categories?.map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="cursor-pointer">
                          <MoreHorizontal className="cursor-pointer" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[110px] rounded-xl p-0 flex flex-col text-center">
                        <p
                          onClick={() =>
                            handleClickEditingCategory(
                              category.id,
                              category.name
                            )
                          }
                          className="text-sm p-2 cursor-pointer hover:bg-gray-100"
                        >
                          Edit
                        </p>
                        <div className="border-t"></div>
                        <p
                          onClick={() => deleteSelectedCategory(category.id)}
                          className="text-sm p-2 text-red-500 cursor-pointer hover:bg-gray-100"
                        >
                          Delete
                        </p>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <CommonPagination totalPages={totalPages} isLoading={loading} onPageChange={fetchCategories}/>
      </CardContent>
    </Card>
  );
}
