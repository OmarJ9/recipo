import { useState } from "react";
import { toast } from "sonner";
import { ReviewWithUserName } from "@/types/recipe";
import { addReview } from "@/actions/review";

interface UseCommentProps {
  initialComments?: ReviewWithUserName[];
  recipeId: string;
  userId: string;
  recipeSlug: string;
}

export function useComment({
  initialComments = [],
  recipeId,
  userId,
  recipeSlug,
}: UseCommentProps) {
  const [comments, setComments] =
    useState<ReviewWithUserName[]>(initialComments);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("comment", commentText);
    formData.append("recipeId", recipeId);
    formData.append("userId", userId);
    formData.append("recipeSlug", recipeSlug);

    const result = await addReview(formData);

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    toast.success(result.success);

    const newComment: ReviewWithUserName = {
      id: Date.now(),
      userId,
      userName: "You",
      recipeId,
      rating,
      comment: commentText,
      createdAt: new Date(),
    };

    setComments([newComment, ...comments]);

    setCommentText("");
    setRating(0);
    setIsLoading(false);
  };

  return {
    comments,
    commentText,
    rating,
    hoveredRating,
    setCommentText,
    setRating,
    setHoveredRating,
    handleAddComment,
    isLoading,
  };
}
