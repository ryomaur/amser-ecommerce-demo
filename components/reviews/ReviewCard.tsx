import Stars from "./Stars";
import { ReviewWithUsername } from "@/actions/getReviews";

interface ReviewCardProps {
  review: ReviewWithUsername;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="w-full">
      <div className="w-full mx-auto flex flex-col md:flex-row border-b border-altlight gap-8 md:gap-20 py-8 md:py-20 px-4 md:px-12">
        <div className="flex flex-col gap-1 min-w-28">
          <Stars rating={review.rating} />
          {review.isEdited ? (
            <>
              <p className="text-xs md:text-sm opacity-75 mt-2 md:mt-4">
                投稿日 {review.createdAt.toLocaleDateString("ja-JP")}
              </p>
              <p className="text-xs md:text-sm opacity-75">
                編集日 {review.updatedAt.toLocaleDateString("ja-JP")}
              </p>
            </>
          ) : (
            <p className="text-xs md:text-sm opacity-75 mt-4">
              投稿日 {review.createdAt.toLocaleDateString("ja-JP")}
            </p>
          )}
          <p className="text-sm md:text-base mt-2">by {review.user.username}</p>
        </div>

        <div className="">
          <h3 className="font-semibold">{review.title}</h3>
          <p className="text-sm md:text-base mt-3 md:mt-5">{review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
