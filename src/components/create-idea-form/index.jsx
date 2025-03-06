"use client";
import TrashIcon from "@/public/icons/Trash.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { useCreateIdeaForm } from "./useCreateIdeaForm";

const CreateIdeaForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    editorState,
    handleEditorChange,
    image,
    getRootProps,
    getInputProps,
    getFileRootProps,
    getFileInputProps,
    isModalOpen,
    setIsModalOpen,
    modalFiles,
    files,
    setFiles,
    handleUploadFiles,
    handleCancelUpload,
    onSubmit,
    handleAnonymousToggle,
    isAnonymous,
    allCategories,
  } = useCreateIdeaForm();

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <h1 className="my-10 text-4xl font-bold">Post an idea</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-[8] space-y-4"
          >
            {/* Thumbnail Image Field */}
            <div
              {...getRootProps()}
              className="border-2 border-solid border-slate-300 flex justify-center items-center p-4 text-center cursor-pointe h-[434px] rounded-lg"
            >
              <input className="cursor-pointer" {...getInputProps()} />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected Image"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="space-y-2 text-gray-600">
                  <p>Drop Image Here</p>
                  <p>OR</p>
                  <Button variant="outline" size="lg">
                    Browse
                  </Button>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}

            <div>
              <label className="text-gray-400" htmlFor="title">
                Title
              </label>
              <Input
                placeholder="Idea title"
                {...register("title")}
                name="title"
                type="text"
                id="title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className={`${allCategories.length === 0 && 'opacity-50 select-none cursor-progress pointer-events-none'}`}>
              <label className="text-gray-400" htmlFor="category">
                Category
              </label>
              <Select
                name="category"
                id="category"
                onValueChange={(val) => {
                  let id = allCategories.find((category) => category?.name === val).id
                  // console.log({id})
                  setValue("facility", id.toString())
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Facility" />
                </SelectTrigger>
                <SelectContent>
                  {allCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.facility && (
                <p className="text-red-500 text-sm">
                  {errors.facility.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-400">Content</label>
              <div className="border p-2 rounded-md">
                <Editor
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "list",
                      "textAlign",
                      "history",
                    ],
                    inline: {
                      options: ["bold", "italic", "strikethrough"],
                    },
                    blockType: {
                      inDropdown: false,
                      options: ["Normal", "H1", "H2", "H3"],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                    textAlign: {
                      options: ["left", "center", "right", "justify"],
                    },
                  }}
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                />
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox name="terms" id="terms" onCheckedChange={(val) => setValue("agree", val)} />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree.message}</p>
            )}

            <Button className="w-full" type="submit">
              Upload Idea
            </Button>

            <Button onClick={handleAnonymousToggle} className="ml-auto table" variant="ghost" type="button">
              Switch as {isAnonymous ? 'User' : 'Anonymous'}
            </Button>
          </form>

          {/* Additional Documents Section */}
          <div className="flex-[2] border p-4 shadow rounded-md h-fit">
            <p className="text-center">Additional Documents</p>

            {/* File List */}
            {files.length > 0 && (
              <ul className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex gap-4 justify-between items-center p-2 border rounded"
                  >
                    <span className="">{file.name}</span>
                    <button
                      className=" w-12 h-12 inline-block"
                      onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
                      }
                    >
                      <Image
                        src={TrashIcon}
                        width={20}
                        height={20}
                        alt="Trash Icon"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Button
              className="w-full mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Upload More
            </Button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <div
            {...getFileRootProps()}
            className="border-2 border-solid border-slate-300 flex justify-center items-center p-4 text-center cursor-pointe w-full h-[434px] rounded-lg"
          >
            <input {...getFileInputProps()} />

            {modalFiles.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {modalFiles.map((file, index) => (
                  <li
                    key={index}
                    className="flex gap-4 justify-between items-center p-2 border rounded"
                  >
                    <span className="">{file.name}</span>
                    <button
                      className=" w-12 h-12 inline-block"
                      onClick={() =>
                        setFiles(files.filter((_, i) => i !== index))
                      }
                    >
                      <Image
                        src={TrashIcon}
                        width={20}
                        height={20}
                        alt="Trash Icon"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-2 text-gray-600">
                <p>Drop Image Here</p>
                <p>OR</p>
                <Button variant="outline" size="lg">
                  Browse
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleCancelUpload} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUploadFiles}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreateIdeaForm;
