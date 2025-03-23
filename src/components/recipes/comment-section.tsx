"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReviewWithUserName } from "@/types/recipe";
import { useComment } from "@/hooks/use-comment";
import { formatDate } from "@/lib/utils";

interface CommentSectionProps {
  initialComments?: ReviewWithUserName[];
  recipeId: string;
  userId: string;
  recipeSlug: string;
}

export function CommentSection({
  initialComments = [],
  recipeId,
  userId,
  recipeSlug,
}: CommentSectionProps) {
  const {
    comments,
    commentText,
    rating,
    hoveredRating,
    setCommentText,
    setRating,
    setHoveredRating,
    handleAddComment,
    isLoading,
  } = useComment({ initialComments, recipeId, userId, recipeSlug });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
      <h3 className="text-xl font-semibold mb-6">Comments</h3>

      {/* Comment input */}
      <div className="flex gap-4 mb-8">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" alt="Your profile" />
          <AvatarFallback className="bg-primary/10 text-primary">
            YO
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          {/* Rating stars */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-3">
                Rate this recipe:
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none transition duration-150"
                    aria-label={`Rate ${star} stars`}
                  >
                    <StarIcon
                      filled={(hoveredRating || rating) >= star}
                      className={`w-7 h-7 ${
                        (hoveredRating || rating) >= star
                          ? "text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <span className="ml-3 text-sm text-gray-500">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                    ? "Very good"
                    : rating === 3
                    ? "Good"
                    : rating === 2
                    ? "Fair"
                    : "Poor"}
                </span>
              )}
            </div>
          </div>

          <Textarea
            placeholder="Share your thoughts on this recipe..."
            className="resize-none min-h-[80px]"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!commentText.trim() || isLoading}
            >
              {isLoading ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
      </div>

      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <Avatar className="h-10 w-10">
                <AvatarImage alt={comment.userName || "Unknown User"} />
                <AvatarFallback className="bg-secondary/80">
                  {comment.userName?.substring(0, 2).toUpperCase() || "Un"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{comment.userName}</h4>
                  <span className="text-muted-foreground text-sm">
                    {formatDate(comment.createdAt.toISOString())}
                  </span>
                </div>
                {comment.rating && (
                  <div className="flex mt-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        filled={comment.rating! >= star}
                        className={`w-4 h-4 ${
                          comment.rating! >= star
                            ? "text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <p className="mt-1 text-gray-700">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Be the first to comment on this recipe!</p>
        </div>
      )}
    </div>
  );
}

// Star icon component with filled/outline variants
function StarIcon({
  filled,
  className = "",
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.5"}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
