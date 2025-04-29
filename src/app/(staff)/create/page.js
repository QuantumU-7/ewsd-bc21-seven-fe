'use client'
import dynamic from "next/dynamic";

const CreateIdeaForm = dynamic(() => import("@/components/create-idea-form"), {
  ssr: false, 
});
const CreateIdeaPage = () => {
  return (
    <div className="min-h-screen">
      <CreateIdeaForm/>
    </div>
  )
}

export default CreateIdeaPage