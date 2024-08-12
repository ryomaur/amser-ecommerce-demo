import prisma from "@/lib/db";

export interface IProductsParams {
  productType?: string;
  movement?: string;
  caseType?: string;
  caseColor?: string;
  faceColor?: string;
  bandType?: string;
  instock?: boolean;
  sort?: string;
  page: string;
}

export default async function getProducts(
  params: IProductsParams,
  pageSize: number
) {
  const {
    productType,
    movement,
    caseType,
    caseColor,
    faceColor,
    bandType,
    instock,
    sort = "newest",
    page = "1",
  } = params;

  let orderBy: any = {
    updatedAt: "desc",
  };

  if (sort === "newest") {
    orderBy = {
      updatedAt: "desc",
    };
  } else if (sort === "oldest") {
    orderBy = {
      updatedAt: "asc",
    };
  } else if (sort === "price-low-high") {
    orderBy = {
      price: "asc",
    };
  } else if (sort === "price-high-low") {
    orderBy = {
      price: "desc",
    };
  }

  const currentPage = parseInt(page);

  const result = await prisma.$transaction([
    prisma.product.count({
      where: {
        productType: productType ? productType : {},
        isHidden: false,
        movement: movement ? { in: movement.split(",") } : {},
        caseType: caseType ? { in: caseType.split(",") } : {},
        caseColor: caseColor ? { in: caseColor.split(",") } : {},
        faceColor: faceColor ? { in: faceColor.split(",") } : {},
        bandType: bandType ? { in: bandType.split(",") } : {},
        stock: instock ? { gt: 0 } : {},
      },
    }),

    prisma.product.findMany({
      where: {
        productType: productType ? productType : {},
        isHidden: false,
        movement: movement ? { in: movement.split(",") } : {},
        caseType: caseType ? { in: caseType.split(",") } : {},
        caseColor: caseColor ? { in: caseColor.split(",") } : {},
        faceColor: faceColor ? { in: faceColor.split(",") } : {},
        bandType: bandType ? { in: bandType.split(",") } : {},
        stock: instock ? { gt: 0 } : {},
      },
      orderBy: orderBy,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalCount = result[0];
  const products = result[1];

  return { totalCount, products };
}
