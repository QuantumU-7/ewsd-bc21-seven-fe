"use client";
import TrashIcon from "@/public/icons/Trash.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useCreateIdeaForm } from "./useCreateIdeaForm";
import { Loader2 } from "lucide-react";
import { EditorContent } from "@tiptap/react";

import {
  ArrowUUpLeft,
  ArrowUUpRight,
  LinkBreak,
  LinkSimple,
  ListDashes,
  ListNumbers,
  Minus,
  Quotes,
  TextB,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  X,
} from "@phosphor-icons/react";

const CreateIdeaForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    // editorState,
    // handleEditorChange,
    // image,
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
    isLoading,
    editor,
    setLink,
    selectedCategory,
    setSelectedCategory,
    setSelectedCategoryId,
    isEditMode,
    imagePreview,
    handleRemoveThumbnail,
  } = useCreateIdeaForm();

  if (!editor) {
    return null;
  }

  return (
    <section
      className={`${
        isLoading ? "select-none pointer-events-none opacity-50" : ""
      } `}
    >
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
              className="border-2 border-solid border-slate-300 flex justify-center items-center p-4 text-center cursor-pointe h-[250px] lg:h-[434px] rounded-lg"
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-md w-full h-full object-cover"
                    width={200}
                    height={200}
                  />
              
                    <Button
                      type="button"
                      variant="destructive"
                      className="absolute top-2 w-10 h-10 right-2 z-10 rounded-full shadow-lg"
                      onClick={handleRemoveThumbnail}
                    >
                      <X fill="white" size={45} />
                    </Button>
               
                </div>
              ) : (
                <div>
                  <input className="cursor-pointer" {...getInputProps()} />
                  <div className="space-y-2 text-gray-600">
                    <p>Drop Image Here</p>
                    <p>OR</p>
                    <Button type="button" variant="outline" size="lg">
                      Browse
                    </Button>
                  </div>
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

            <div
              className={`${
                allCategories.length === 0 &&
                "opacity-50 select-none cursor-progress pointer-events-none"
              }`}
            >
              <label className="text-gray-400" htmlFor="category">
                Category
              </label>
              <Select
                name="category"
                id="category"
                value={selectedCategory}
                onValueChange={(val) => {
                  let id = allCategories.find(
                    (category) => category?.name === val
                  ).id;
                  setSelectedCategoryId(id);
                  setSelectedCategory(val);
                  setValue("facility", val);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Facility">
                    {selectedCategory || "Select Facility"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {allCategories?.map((category) => (
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
              <div className="border rounded-md rdw-editor-wrapper prose relative">
                {/* Toolbar */}
                <div className="toolbar sticky bg-white shadow-md top-20 z-20 p-2 flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={
                      editor.isActive("bold") ? "!bg-primary !text-white" : ""
                    }
                  >
                    <TextB size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={
                      editor.isActive("italic") ? "!bg-primary !text-white" : ""
                    }
                  >
                    <TextItalic size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={
                      editor.isActive("strike") ? "!bg-primary !text-white" : ""
                    }
                  >
                    <TextStrikethrough size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                    className={
                      editor.isActive("underline")
                        ? "!bg-primary !text-white"
                        : ""
                    }
                  >
                    <TextUnderline size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setHorizontalRule().run()
                    }
                  >
                    <Minus size={22} />
                  </button>
                  <button
                    type="button"
                    className={
                      editor.isActive("heading", { level: 1 })
                        ? "!bg-primary !text-white"
                        : ""
                    }
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    className={
                      editor.isActive("heading", { level: 2 })
                        ? "!bg-primary !text-white"
                        : ""
                    }
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    className={
                      editor.isActive("heading", { level: 3 })
                        ? "!bg-primary !text-white"
                        : ""
                    }
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    className={
                      editor.isActive("bulletList")
                        ? "!bg-primary !text-white"
                        : ""
                    }
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                  >
                    <ListDashes size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                      editor.isActive("orderedList")
                        ? "!bg-primary !text-white"
                        : ""
                    }
                  >
                    <ListNumbers size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    className={
                      editor.isActive("blockquote")
                        ? "!bg-primary !text-white"
                        : ""
                    }
                  >
                    <Quotes size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={setLink}
                    className={
                      editor.isActive("link") ? "!bg-primary !text-white" : ""
                    }
                  >
                    <LinkSimple size={22} />
                  </button>
                  {editor.isActive("link") && (
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().unsetLink().run()}
                      disabled={!editor.isActive("link")}
                    >
                      <LinkBreak size={22} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                  >
                    <ArrowUUpLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                  >
                    <ArrowUUpRight size={22} />
                  </button>
                </div>
                <EditorContent editor={editor} />
              </div>
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                name="terms"
                id="terms"
                onCheckedChange={(val) => setValue("agree", val)}
              />
              <label htmlFor="terms">I agree to the</label>
              <Dialog>
                <DialogTrigger asChild>
                  <p className="underline text-primary cursor-pointer">Terms and Conditions</p>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg max-h-[50%] overflow-scroll">
                  <DialogHeader>
                    <DialogTitle> Quantum University Idea Submission System – Terms and
                    Conditions</DialogTitle>

                  </DialogHeader>

                  <ol className="space-y-4 list-decimal list-inside text-base leading-relaxed">
                    <li>
                      <strong>Purpose:</strong> The system collects ideas from
                      staff members (academic and support) to improve University
                      processes, services, and operations.
                    </li>
                    <li>
                      <strong>Eligibility:</strong> Only current University
                      staff members with valid institutional accounts may
                      submit, view, or comment on ideas.
                    </li>
                    <li>
                      <strong>Submission Rules:</strong> Submissions must be
                      original and relevant to the University’s goals.
                      Offensive, discriminatory, unlawful, or plagiarized
                      content is prohibited. Supporting documents must follow
                      the same guidelines (PDF, JPEG, PNG, XLSX; max 10MB).
                    </li>
                    <li>
                      <strong>Anonymity and Accountability:</strong> Anonymous
                      submissions are allowed; however, real identities are
                      stored securely for audit purposes. Users remain
                      responsible for any content they submit, even anonymously.
                    </li>
                    <li>
                      <strong>Voting and Comments:</strong> Each staff member
                      can vote once (Thumbs Up/Down) per idea. Comments must
                      remain respectful and relevant.
                    </li>
                    <li>
                      <strong>Notifications:</strong> QA Coordinators are
                      notified when a new idea is submitted. Idea authors are
                      notified when comments are added to their ideas.
                    </li>
                    <li>
                      <strong>Closure Dates:</strong> New ideas cannot be
                      submitted after the idea closure date. Comments close
                      after the final closure date.
                    </li>
                    <li>
                      <strong>Data Usage:</strong> Ideas and comments may be
                      used internally for evaluation and reporting. Uploaded
                      documents are securely stored and exported by the QA
                      Manager post-final closure.
                    </li>
                    <li>
                      <strong>Intellectual Property:</strong> The University has
                      the right to use submitted ideas for institutional
                      improvement. Idea ownership remains with the submitter
                      unless otherwise agreed.
                    </li>
                    <li>
                      <strong>Prohibited Actions:</strong> Spam, disruptive
                      behavior, misuse of the system, and multiple identical
                      submissions are forbidden.
                    </li>
                    <li>
                      <strong>Changes to Terms:</strong> The University may
                      amend these terms at any time. Continued use indicates
                      acceptance of any updates.
                    </li>
                    <li>
                      <strong>Acceptance:</strong> By submitting an idea, you
                      confirm you have read and accepted these Terms and
                      Conditions.
                    </li>
                  </ol>

                  <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-600">
                    Contact:{" "}
                    <a
                      href="mailto:qaoffice@university.edu"
                      className="text-blue-600 hover:underline"
                    >
                      squantumuniversity@gmail.com	
                    </a>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" className="bg-primary ml-auto">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree.message}</p>
            )}

            <Button className="w-full" type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                `${isEditMode ? "Update this" : "Submit this"} Idea`
              )}
            </Button>

            <Button
              onClick={handleAnonymousToggle}
              className="ml-auto table"
              variant="ghost"
              type="button"
            >
              Switch as {isAnonymous ? "User" : "Anonymous"}
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
                      type="button"
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
                      type="button"
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
