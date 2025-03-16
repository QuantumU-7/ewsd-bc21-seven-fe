import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorState, convertToRaw } from "draft-js";
import { getAllCategories } from "@/services/categoryManagementService";
import draftToHtml from "draftjs-to-html";
import { createNewIdeaService } from "@/services/ideaManagementService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  facility: z.string().min(1, "Facility is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  agree: z.boolean().refine((val) => val, "You must agree to the terms"),
  image: z.any().refine((val) => val instanceof File, "Thumbnail is required"),
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

  const router = useRouter();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [modalFiles, setModalFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await getAllCategories();
        setAllCategories(data);
        console.log({ data });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllCategories();
    setValue("isAnonymous", isAnonymous);
  }, []);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setValue("image", acceptedFiles[0]);

    // const file = acceptedFiles[0];
    // setImage(file);

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   console.log({ imageData: reader.result });
    //   setValue("image", reader.result);
    // };
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
    formData.append("category_id", Number(data.facility));
    formData.append("posted_by", Number(1));
    formData.append("is_posted_anon", data.isAnonymous === true ? "true" : "false");

    if (data.image instanceof File) {
      formData.append("thumbnail", data.image);
    }

    if (files.length > 0) {
      files.forEach((file) => {
        if (file instanceof File) {
          formData.append(`files`, file);
        }
      });
    }

    console.log("About to submit form data");
    
    const result = await createNewIdeaService(formData);
    console.log("API Response:", result);
    setIsLoading(false);
    toast("Idea created successfully!");
    router.push('/')
  } catch (error) {
    setIsLoading(false);
    console.error("Error submitting form:", error);
    toast(error.message || "Failed to create idea");
  }
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
    isLoading
  };
};
