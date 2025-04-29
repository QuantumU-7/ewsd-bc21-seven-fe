import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorState, convertToRaw } from "draft-js";
import { getAllCategories } from "@/services/categoryManagementService";
import draftToHtml from "draftjs-to-html";
import {
  createNewIdeaService,
  updateIdeaService,
} from "@/services/ideaManagementService";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { getIdeaById } from "@/services/getIdeaById";
import { useEditor } from "@tiptap/react";
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
import Link from "@tiptap/extension-link";
import { convertBase64ToImage } from "@/utils/image";
import { getUser } from "@/utils/authentication";
import { useIdeas } from "@/providers/IdeasContext";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  facility: z.string().min(1, "Facility is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  agree: z.boolean().refine((val) => val, "You must agree to the terms"),
  image: z.any().refine((val) => val, "Thumbnail is required"),
  isAnonymous: z.boolean(),
});

export const useCreateIdeaForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // console.log({ errors: errors });
  // console.log({ errors: errors });

  const router = useRouter();
  const pathName = usePathname();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [modalFiles, setModalFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isThumbnailReplaced, setIsThumbnailReplaced] = useState(false);


  const { fetchIdeas, editingIdeaId, setEditingIdeaId } = useIdeas()


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

  const fetchAllCategories = async () => {
    try {
      const data = await getAllCategories(1, 99);
      setAllCategories(data.data);
      console.log({ data });
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchIdeaById = async () => {
    setIsLoading(true);
    try {
      const data = await getIdeaById(editingIdeaId);


      if (allCategories.length > 0) {
        let categoryName = allCategories?.find(
          (category) => category?.id === data.category.id
        ).name;
        console.log(categoryName);
        setValue("facility", categoryName);
        setSelectedCategory(categoryName);
      }



      // setAllCategories(data.data);
      setValue("title", data.title);
      setValue("content", data.description);
      editor?.commands.setContent(data.description);
      setValue("image", convertBase64ToImage(data.thumbnail));
      setImage(convertBase64ToImage(data.thumbnail));
      setSelectedCategoryId(data.category.id);

      setValue("isAnonymous", data.posted_by.id === null ? true : false);
      setIsAnonymous(data.posted_by.id === null ? true : false);
      console.log({ isAnonymous: data.posted_by.id === null });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
    }
  };
  // console.log({ image });

  useEffect(() => {
    fetchAllCategories();
    setValue("isAnonymous", isAnonymous);
  }, []);

  useEffect(() => {
    if (pathName.includes("/edit") && editingIdeaId) {
      setIsEditMode(true);
      fetchIdeaById();
    } else if(pathName.includes("/edit") && editingIdeaId === null) {
      setIsEditMode(false);
      router.push("/ideas");
    }


  }, [editor, allCategories]);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setValue("image", acceptedFiles[0]);
    setIsThumbnailReplaced(true);
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
    // const contentRaw = JSON.stringify(convertToRaw(state.getCurrentContent()));
    let htmlString = draftToHtml(convertToRaw(state.getCurrentContent()));
    // console.log({htmlString})
    setValue("content", htmlString);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } =
    useDropzone({
      accept: "image/*,application/pdf",
      multiple: true,
      onDrop: (acceptedFiles) => {
        setModalFiles((prev) => [...prev, ...acceptedFiles]);
      },
    });

  const handleUploadFiles = () => {
    setFiles((prev) => [...prev, ...modalFiles]);
    setModalFiles([]);
    setIsModalOpen(false);
  };

  const handleCancelUpload = () => {
    setModalFiles([]);
    setIsModalOpen(false);
  };

  const handleAnonymousToggle = () => {
    setValue("isAnonymous", !isAnonymous);
    setIsAnonymous(!isAnonymous);
  };

  // Fix for the onSubmit function
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.content);
      formData.append("category_id", Number(selectedCategoryId));
      formData.append("posted_by", Number(getUser().id));
      formData.append(
        "is_posted_anon",
        data.isAnonymous === true ? "true" : "false"
      );



      if (!isEditMode || isThumbnailReplaced) {
        formData.append("thumbnail", data.image);
        formData.append("update_thumbnail", true);
        formData.append("update_thumbnail", true);
      }



      if (files.length > 0) {
        files.forEach((file) => {
          if (file instanceof File) {
            formData.append(`files`, file);
          }
        });
      }

      if (!isEditMode) {
        const result = await createNewIdeaService(formData);
        console.log("API Response:", result);
        setIsLoading(false);
        toast.success("Idea created successfully!");
      } else {
        const result = await updateIdeaService(
          editingIdeaId,
          formData
        );
        console.log("API Response:", result);
        setEditingIdeaId(null)
        setIsLoading(false);
        toast.success("Idea updated successfully!");
      }
      fetchIdeas(1);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      toast(error.message || "Failed to create idea");
    }
  };

  const imageValue = watch("image");
  let imagePreview = "";

  if (typeof imageValue === "string") {
    imagePreview = imageValue;
  } else if (imageValue instanceof File) {
    imagePreview = URL.createObjectURL(imageValue);
  } else if (imageValue && Array.isArray(imageValue) && imageValue.length > 0) {
    imagePreview = URL.createObjectURL(imageValue[0]);
  }

  const handleRemoveThumbnail = () => {
    setImage(null);
    setValue("image", null);
    setIsThumbnailReplaced(true);
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    editorState,
    allCategories,
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
    isLoading,
    editor,
    setLink,
    selectedCategory,
    setSelectedCategory,
    setSelectedCategoryId,
    isEditMode,
    imageValue,
    imagePreview,
    handleRemoveThumbnail,
  };
};
