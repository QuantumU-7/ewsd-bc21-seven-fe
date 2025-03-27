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
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { useCreateIdeaForm } from "./useCreateIdeaForm";
import { Loader2 } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
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
} from "@phosphor-icons/react";
import { useCallback } from "react";
import Link from "@tiptap/extension-link";

const CreateIdeaForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    // editorState,
    // handleEditorChange,
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
    isLoading,
  } = useCreateIdeaForm();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Strike,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      HorizontalRule,
      // History,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
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
                  <Button type="button" variant="outline" size="lg">
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
                onValueChange={(val) => {
                  let id = allCategories.find(
                    (category) => category?.name === val
                  ).id;
                  // console.log({id})
                  setValue("facility", id.toString());
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Facility" />
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
              <div className="border rounded-md rdw-editor-wrapper prose">
                {/* Toolbar */}
                <div className="toolbar flex gap-2">
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
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree.message}</p>
            )}

            <Button className="w-full" type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Upload Idea"
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
