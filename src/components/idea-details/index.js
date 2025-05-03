"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  ThumbsDown,
  Eye,
  Loader2,
  Download,
  MessageCircleWarning,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { getIdeaById } from "@/services/getIdeaById";
import { toggleLikeIdea } from "@/services/ideaInteraction";
import { toast } from "sonner";
import { createComment } from "@/services/createComment";
import { exportIdeaToCSV } from "@/services/exportIdeaToCSV";
import { RemarkBox } from "../shared/common/Dialog/RemarkBox";
import { ideaReportService } from "@/services/ideaReport";
import { convertBase64ToImage } from "@/utils/image";
import DefaultThumbnail from "@/public/images/default.png";
import { getClosureDateService } from "@/services/getClosureDates";
import { getAllRestrictionService } from "@/services/getAllRestrictionService";
import { TokenKeys } from "@/constants/tokenKeys";

const IdeaDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [remark, setRemark] = useState("");
  const [likebyauthor, setLikebyauthor] = useState(false);
  const [dislikebyauthor, setDislikebyauthor] = useState(false);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [finalClosureDate, setFinalClosureDate] = useState(null);
  const [showVotingFeature, setShowVotingFeature] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchIdeaDetail = async () => {
      try {
        const response = await getIdeaById(params.id);
        setIdea(response);
        setLikebyauthor(response.current_user_reaction == "liked");
        setDislikebyauthor(response.current_user_reaction == "disliked");
        setLikeCount(response.likes_count);
        setDislikeCount(response.dislikes_count);
        setComments(response.comments);
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchIdeaDetail();
    }
  }, [params.id]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(TokenKeys.user));
    if (userData) {
      setCurrentUser(userData);
    }

    const fetchData = async () => {
      try {
        const response = await getAllRestrictionService();
        if (response && response?.length > 0) {
          await fetchClosureDates();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (submissionDate && finalClosureDate) {
      checkDates();
    }
  }, [submissionDate, finalClosureDate]);

  const checkDates = () => {
    const currentDate = new Date();
    const normalizedCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const normalizedSubmissionDate = submissionDate
      ? new Date(
          submissionDate.getFullYear(),
          submissionDate.getMonth(),
          submissionDate.getDate()
        )
      : null;
    const normalizedFinalClosureDate = finalClosureDate
      ? new Date(
          finalClosureDate.getFullYear(),
          finalClosureDate.getMonth(),
          finalClosureDate.getDate()
        )
      : null;

    if (
      normalizedSubmissionDate &&
      normalizedCurrentDate < normalizedSubmissionDate
    ) {
      setShowVotingFeature(true);
    } else if (
      normalizedFinalClosureDate &&
      normalizedCurrentDate >= normalizedFinalClosureDate
    ) {
      setShowVotingFeature(false);
    } else {
      setShowVotingFeature(true);
    }
  };

  const fetchClosureDates = async () => {
    try {
      const response = await getClosureDateService();
      if (response) {
        setSubmissionDate(new Date(response.submission_date));
        setFinalClosureDate(new Date(response.final_closure_date));
      }
    } catch (error) {
      toast.error(
        error.response.data.detail || "Failed to fetch closure dates!"
      );
    }
  };

  const toggleLike = async (id, isLike) => {
    if (isLike) {
      setLikeCount((prevCount) => prevCount + 1);
      setDislikeCount((prevCount) => Math.max(prevCount - 1, 0));
    } else {
      setDislikeCount((prevCount) => prevCount + 1);
      setLikeCount((prevCount) => Math.max(prevCount - 1, 0));
    }
    setLikebyauthor(isLike);
    setDislikebyauthor(!isLike);
    try {
      // Set loading state based on if it's a like or dislike
      if (isLike) {
        setLikeLoading(true);
      } else {
        setDislikeLoading(true);
      }

      const response = await toggleLikeIdea(id, isLike);
      // Update idea with new like/dislike counts from response
      if (response && response.data) {
        setIdea((prevIdea) => ({
          ...prevIdea,
          likes_count: response.data.likes_count || prevIdea.likes_count,
          dislikes_count:
            response.data.dislikes_count || prevIdea.dislikes_count,
        }));
      }
    } catch (error) {
      console.error("Failed to like idea:", error);
      toast.error("Failed to interact with idea");
    } finally {
      // Reset loading states
      if (isLike) {
        setLikeLoading(false);
      } else {
        setDislikeLoading(false);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    setCommentLoading(true);
    try {
      const res = await createComment(params.id, isAnonymous, commentText);
      setComments((prevComments) => [
        {
          ispostedanon: isAnonymous,
          username: currentUser.firstname + " " + currentUser.lastname,
          comment: commentText,
          postedon: new Date().toISOString(),
        },
        ...prevComments,
      ]);
      // Update the idea state with the new comment
      if (res && res.data) {
        const newComment = res.data;
        setIdea((prevIdea) => ({
          ...prevIdea,
          comments: [newComment, ...(prevIdea.comments || [])],
          comments_count: (prevIdea.comments_count || 0) + 1,
        }));
      }

      // Reset comment field and anonymous checkbox after submission
      setCommentText("");
      setIsAnonymous(false);
      toast.success("Comment posted successfully!");
    } catch (e) {
      toast.error("Failed to post comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCancelComment = () => {
    setCommentText("");
    setIsAnonymous(false);
  };

  const handleExportCSV = async () => {
    setExportLoading(true);
    try {
      await exportIdeaToCSV();
      toast.success("Idea exported successfully!");
    } catch (error) {
      toast.error("Failed to export idea");
    } finally {
      setExportLoading(false);
    }
  };

  const handleReportIdea = async (id) => {
    try {
      await ideaReportService(id, remark);
      toast.success("Idea reported successfully!");
      setRemark("");
      setOpenConfirmBox(false);
    } catch (e) {
      toast.error("Failed to report idea");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl h-screen mx-auto my-8 px-4 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg">Loading...</p>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="max-w-3xl h-screen mx-auto my-8 px-4">
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
    <div className="lg:max-w-7xl mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={exportLoading}
        >
          {exportLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Export CSV
        </Button>
      </div>
      {/* Image and documents section */}
      <div className="w-full h-[450px] flex flex-col lg:flex-row gap-7 p-2">
        <div className="w-full lg:w-2/3 h-full relative flex justify-center">
          {idea.thumbnail ? (
            <img
              className="w-full h-[270px] object-cover lg:h-auto"
              src={convertBase64ToImage(idea.thumbnail)}
              width={300}
              height={200}
              alt={idea.title}
            />
          ) : (
            <Image
              className="w-full h-[270px] object-cover lg:h-auto"
              src={DefaultThumbnail}
              width={300}
              height={200}
              alt={idea.title}
            />
          )}
        </div>
        <div className="w-full lg:w-1/3 h-[200px] shadow-md p-4 bg-white rounded-lg">
          <p className="text-lg font-medium text-center mb-4">
            Additional Documents
          </p>
          <div className="space-y-3">
            {idea.files && idea.files.length > 0 ? (
              idea.files.map((doc, index) => (
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
                    href={doc.filelocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-700 hover:text-blue-600"
                  >
                    {typeof doc === "object"
                      ? doc.filename || "Unnamed document"
                      : doc}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">
                No documents available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content and interactions section */}
      <div className="w-full flex gap-7 p-2">
        <div className="w-full lg:w-2/3 gap-7 flex">
          <div className="w-full">
            {/* User info and title */}
            <div className="w-full flex justify-between">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>
                    {idea.posted_by.firstname.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {idea.ispostedanon
                      ? "Anonymous"
                      : `${idea.posted_by.firstname} ${idea.posted_by.lastname}`}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    {idea.category.name || "Uncategorized"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                {idea.posted_on
                  ? formatDate(idea.posted_on)
                  : "Date unavailable"}
              </p>
            </div>

            {/* Idea content */}
            <div className="my-3">
              <p className="text-2xl font-bold text-primary mb-2">
                {idea.title || "Untitled"}
              </p>
              <div className="text-gray-700 mb-7 rdw-editor-wrapper prose">
                <div
                  dangerouslySetInnerHTML={{ __html: idea.description }}
                ></div>
              </div>

              {/* Comments section */}
              <div>
                {/* Comment input */}
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {" "}
                      {currentUser.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Write your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2"
                      disabled={commentLoading || !showVotingFeature}
                    />

                    <div className="flex justify-between items-center">
                      {showVotingFeature && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="anonymous"
                            checked={isAnonymous}
                            onCheckedChange={setIsAnonymous}
                            disabled={commentLoading || !showVotingFeature}
                          />
                          <label
                            htmlFor="anonymous"
                            className="text-sm text-gray-600 cursor-pointer"
                          >
                            Post anonymously
                          </label>
                        </div>
                      )}

                      {(commentText.trim() !== "" || commentLoading) && (
                        <div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelComment}
                            disabled={commentLoading}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="ml-2"
                            onClick={handleCommentSubmit}
                            disabled={commentLoading || !commentText.trim()}
                          >
                            {commentLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                                Posting...
                              </>
                            ) : (
                              "Comment"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comments list */}
                {comments.length > 0 ? (
                  <div>
                    {comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex w-full justify-between my-5"
                      >
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {typeof comment.username === "string"
                                ? comment.username.charAt(0)
                                : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="leading-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="font-bold">
                                {comment.ispostedanon
                                  ? "Anonymous"
                                  : comment.username}
                              </p>
                            </div>
                            <p className="mt-1 text-gray-700 text-sm">
                              {comment.comment || "No comment text"}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          {comment.postedon
                            ? formatDate(comment.postedon)
                            : "Date unavailable"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {showVotingFeature && (
                      <div className="p-4 text-center text-gray-500">
                        No comments yet. Be the first to comment!
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Like/Dislike interactions */}
        <div className="fixed bg-white border lg:border-none top-1/2 py-2 w-16 flex justify-center lg:justify-start shadow-md lg:shadow-none rounded-md right-3 lg:relative lg:w-1/3 pt-[4vw]">
          <div className="w-[2vw] space-y-4">
            {/* Like button with loading state */}
            <div
              className={`flex flex-col justify-center items-center cursor-pointer ${
                !showVotingFeature ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {likeLoading ? (
                <Loader2 className="text-red-600 animate-spin" size={24} />
              ) : likebyauthor ? (
                <Heart className="text-red-600 fill-current" size={24} />
              ) : (
                <Heart
                  className="text-red-600 "
                  size={24}
                  onClick={
                    showVotingFeature
                      ? () => !likeLoading && toggleLike(idea.id, true)
                      : null
                  }
                />
              )}
              <p className="text-sm">{likeCount}</p>
            </div>

            {/* Dislike button with loading state */}
            <div
              className={`flex flex-col justify-center items-center cursor-pointer ${
                !showVotingFeature ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {dislikeLoading ? (
                <Loader2 className="text-primary animate-spin" size={24} />
              ) : dislikebyauthor ? (
                <ThumbsDown className="text-primary fill-current" size={24} />
              ) : (
                <ThumbsDown
                  className="text-primary"
                  size={24}
                  onClick={
                    showVotingFeature
                      ? () => !dislikeLoading && toggleLike(idea.id, false)
                      : null
                  }
                />
              )}
              <p className="text-sm">{dislikeCount}</p>
            </div>

            {/* Views count (no interaction) */}
            <div
              className={`flex flex-col justify-center items-center ${
                !showVotingFeature ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Eye className="text-primary" />
              <p className="text-sm">{idea.views_count + 1}</p>
            </div>

            {/* Report button */}
            <div
              className={`flex flex-col justify-center items-center cursor-pointer ${
                !showVotingFeature ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={showVotingFeature ? () => setOpenConfirmBox(true) : null}
            >
              <MessageCircleWarning className="text-primary" size={24} />
              <p className="text-sm">Report</p>
            </div>
          </div>
        </div>
      </div>
      <RemarkBox
        title="Report Idea"
        description="Are you sure you want to report this idea?"
        remark={remark}
        setRemark={setRemark}
        onConfirm={() => {
          if (idea.id) {
            handleReportIdea(idea.id);
            setOpenConfirmBox(false);
          }
        }}
        onCancel={() => setOpenConfirmBox(false)}
        isOpen={openConfirmBox}
        setIsOpen={setOpenConfirmBox}
      />
    </div>
  );
};

export default IdeaDetailPage;
