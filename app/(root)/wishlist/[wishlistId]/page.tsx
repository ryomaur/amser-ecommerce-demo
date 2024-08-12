import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import UserWishlistTogglePublicButton from "./components/UserWishlistTogglePublicButton";
import UserWishlistItem from "./components/UserWishlistItem";

export const metadata = {
  title: "ウィッシュリスト | Amser",
  description: "ウィッシュリストページ",
};

interface UserWishlistPageProps {
  params: {
    wishlistId: string;
  };
}

const UserWishlistPage: React.FC<UserWishlistPageProps> = async ({
  params: { wishlistId },
}) => {
  let authorName: string | null | undefined;
  const session = await getServerSession(authOptions);
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      id: wishlistId,
    },
    include: {
      wishlistItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!wishlist) {
    notFound();
  }

  if (wishlist.userId) {
    const author = await prisma.user.findUnique({
      where: {
        id: wishlist.userId,
      },
    });
    authorName = author?.username;
  }

  const isAuthor = wishlist.userId === session?.user.id;

  if (!wishlist.isPublic || !wishlist.userId) {
    if (!isAuthor) {
      return (
        <div className="h-screen w-full font-sans">
          <div className="flex h-screen items-center justify-center text-center text-xl">
            このウィッシュリストは非公開です
          </div>
        </div>
      );
    }
  }

  return (
    <div className="main-container mb-36 mt-14 px-4 font-sans text-foreground md:min-h-[50vh] md:px-8 xl:px-0">
      <div className="w-full pt-8 md:pt-16">
        <h1 className="text-center text-xl font-bold md:text-2xl xl:text-3xl">
          {authorName && authorName + "さんの"}
          <br className="lg:hidden" />
          ウィッシュリスト
        </h1>

        {isAuthor && (
          <div className="mt-8 flex w-full justify-end md:mt-0">
            <UserWishlistTogglePublicButton isPublic={wishlist.isPublic} />
          </div>
        )}
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 xl:gap-12">
          {wishlist.wishlistItems.map((item) => (
            <UserWishlistItem
              key={item.id}
              product={item.product}
              isAuthor={isAuthor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserWishlistPage;
