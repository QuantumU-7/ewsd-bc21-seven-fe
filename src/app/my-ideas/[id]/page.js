// app/ideas/[id]/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  ThumbsDown,
  Clock,
  MessageSquare,
  Share2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { toast } from "@/components/ui/use-toast";

const IdeaDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchIdeaDetail = async () => {
      try {
        // const response = await fetch(`/api/ideas/${params.id}`);

        // if (!response.ok) {
        //   throw new Error("Failed to fetch idea details");
        // }

        // const data = await response.json();
        const data = {
          id: "300",
          image_url:
            "https://images.unsplash.com/photo-1562825606-7e7187e44a83?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          title: "Workplace Well-Being & Mental Health Support",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum fuga eu, ut viverra lorem pretium quis. Sed metus nibh odio vitae ultrices. Fusce suscipit vestibulum pretium. Sed at magna consectetur, mollis elit nec, luctus massa. Morbi accumsan ipsum at lorem mattis, ac sodales ante varius. Ut dapibus diam neque lacus gravida. Curabitur sit amet eleifend nibh. Nullam a scelerisque mauris, eget commodo purus. Etiam nulla sapien, scelerisque eu venenatis sed, facilisis a nunc. Sed vitae dolor diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum fuga eu, ut viverra lorem pretium quis. Sed metus nibh odio vitae ultrices. Fusce suscipit vestibulum pretium. Sed at magna consectetur, mollis elit nec, luctus massa. Morbi accumsan ipsum at lorem mattis, ac sodales ante varius. Ut dapibus diam neque lacus gravida. Curabitur sit amet eleifend nibh. Nullam a scelerisque mauris, eget commodo purus. Etiam nulla sapien, scelerisque eu venenatis sed, facilisis a nunc. Sed vitae dolor diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum fuga eu, ut viverra lorem pretium quis. Sed metus nibh odio vitae ultrices. Fusce suscipit vestibulum pretium. Sed at magna consectetur, mollis elit nec, luctus massa. Morbi accumsan ipsum at lorem mattis, ac sodales ante varius. Ut dapibus diam neque lacus gravida. Curabitur sit amet eleifend nibh. Nullam a scelerisque mauris, eget commodo purus. Etiam nulla sapien, scelerisque eu venenatis sed, facilisis a nunc. Sed vitae dolor diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum fuga eu, ut viverra lorem pretium quis. Sed metus nibh odio vitae ultrices. Fusce suscipit vestibulum pretium. Sed at magna consectetur, mollis elit nec, luctus massa. Morbi accumsan ipsum at lorem mattis, ac sodales ante varius. Ut dapibus diam neque lacus gravida. Curabitur sit amet eleifend nibh. Nullam a scelerisque mauris, eget commodo purus. Etiam nulla sapien, scelerisque eu venenatis sed, facilisis a nunc.",
          likes: 128,
          dislikes: 40,
          comments: [
            {
              id: 1,
              user: "Faint",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              createdAt: "2025-02-12T14:30:00Z",
            },
            {
              id: 2,
              user: "Anonymous User",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              createdAt: "2025-02-12T15:45:00Z",
            },
            {
              id: 3,
              user: "Anonymous User",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              createdAt: "2025-02-12T16:15:00Z",
            },
            {
              id: 4,
              user: "Anonymous User",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              createdAt: "2025-02-12T17:30:00Z",
            },
            {
              id: 5,
              user: "Anonymous User",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              createdAt: "2025-02-12T18:00:00Z",
            },
          ],
          category: "Well-Being",
          status: "Published",
          createdBy: "Anonymous User",
          createdAt: "2025-02-11T10:00:00Z",
          updatedAt: "2025-02-11T10:00:00Z",
          documents: [
            { name: "idea_doc1.pdf", url: "/documents/idea_doc1.pdf" },
            { name: "idea_doc1.pdf", url: "/documents/idea_doc1.pdf" },
            { name: "idea_doc1.pdf", url: "/documents/idea_doc1.pdf" },
          ],
        };
        console.log(data);
        setIdea(data);
      } catch (error) {
        console.error("Error fetching idea details:", error);
        // toast({
        //   title: "Error",
        //   description: "Failed to load idea details. Please try again.",
        //   variant: "destructive",
        // });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchIdeaDetail();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto my-8 px-4 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="max-w-3xl mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold">Idea not found</h2>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Ideas
        </Button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-8 h-[42vw] overflow-auto">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="w-full h-[450px] flex gap-7 p-2">
        <div className="w-2/3 h-full relative flex justify-center">
          <Image
            src={idea.image_url}
            alt="idea detail logo"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-1/3 h-[200px] shadow-md p-4 bg-white rounded-lg">
          <p className="text-lg font-medium text-center mb-4">
            Additional Documents
          </p>
          <div className="space-y-3">
            {idea.documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="bg-red-100 p-1 rounded">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  {doc.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-7 p-2">
        <div className="w-2/3 gap-7 flex">
          <div>
            <div className="w-full flex justify-between">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>{idea.createdBy.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{idea.createdBy}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    {idea.category}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                {formatDate(idea.createdAt)}
              </p>
            </div>
            <div className="my-3">
              <p className="text-2xl font-bold text-primary mb-2">
                {idea.title}
              </p>
              <p className="text-gray-700 mb-7">{idea.description}</p>

              <div>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Write your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex justify-end">
                      <Button size="sm" variant="ghost">
                        Cancel
                      </Button>
                      <Button size="sm" className="ml-2">
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Comments list */}
                {idea.comments && idea.comments.length > 0 ? (
                  <div>
                    {idea.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex w-full justify-between my-5"
                      >
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {comment.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="leading-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="font-bold">{comment.user}</p>
                            </div>
                            <p className="mt-1 text-gray-700 text-sm">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 pt-[4vw] space-y-4">
          <div className="flex flex-col justify-center ">
            <Heart className="text-red-600" />
            <p className="text-sm">120</p>
          </div>
          <div className="flex flex-col justify-center ">
            <ThumbsDown className="text-primary" />
            <p className="text-sm">120</p>
          </div>
          <div className="flex flex-col justify-center ">
            <Eye className="text-primary" />
            <p className="text-sm">120</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailPage;
