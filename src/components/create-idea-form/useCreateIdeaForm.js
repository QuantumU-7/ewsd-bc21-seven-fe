import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorState, convertToRaw } from "draft-js";
import { getAllCategories } from "@/services/categoryManagementService";
import draftToHtml from "draftjs-to-html";

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

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [modalFiles, setModalFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [ isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const data = await getAllCategories();
        setAllCategories(data);
        console.log({data});
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllCategories();
    setValue("isAnonymous", isAnonymous)
  }, []);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setValue("image", acceptedFiles[0]);
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
    setValue("isAnonymous",!isAnonymous);
    setIsAnonymous(!isAnonymous);
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
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
  };
};
