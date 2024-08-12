import { getWishlist } from "./wishlist";

export async function checkWishlisted(productId: string) {
  const wishlist = await getWishlist();

  if (!wishlist) return false;

  const wishlistedItem = wishlist.wishlistItems.find(
    (item) => item.productId === productId
  );

  if (wishlistedItem) {
    return true;
  } else {
    return false;
  }
}
