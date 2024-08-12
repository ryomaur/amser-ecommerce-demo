import { getServerSession } from "next-auth";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import EditReviewForm from "./EditReviewForm";
import { ReviewWithUsername } from "@/actions/getReviews";
import Pagination from "../Pagination";

interface ReviewsProps {
  productId: string;
  totalCount: number;
  reviews: ReviewWithUsername[];
  totalPages: number;
}

const Reviews: React.FC<ReviewsProps> = async ({
  productId,
  reviews,
  totalPages,
  totalCount,
}) => {
  const session = await getServerSession(authOptions);

  const userReview = await prisma.review.findFirst({
    where: {
      userId: session?.user.id,
      productId,
    },
  });

  return (
    <div className="main-container mt-20 lg:mt-40 px-4 md:px-8 xl:px-0">
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl px-4 md:px-8 xl:px-0">
        レビュー
      </h1>
      {session && userReview ? (
        <EditReviewForm userReview={userReview} />
      ) : (
        <ReviewForm session={session} productId={productId} />
      )}
      <div className="mt-10">
        <div className="w-full border-b-2 border-foreground/50 mb-4 text-lg">
          <h3 className="mx-5 py-2 font-medium">{totalCount}件のレビュー</h3>
        </div>
        <div className="flex flex-col">
          {reviews.length ? (
            <>
              {reviews.map((review) => (
                <ReviewCard review={review} key={review.id} />
              ))}
              {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </>
          ) : (
            <div className="mt-20 mb-32 text-center font-semibold text-foreground/70">
              レビューがまだありません
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
