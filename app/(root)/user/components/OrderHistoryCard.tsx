import { OrderWithProducts } from "@/actions/getUserOrders";
import Image from "next/image";

interface OrderHistoryCardProps {
  order: OrderWithProducts;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ order }) => {
  return (
    <div className="mt-5 w-full rounded-lg border border-foreground px-3 py-7 md:mt-9 md:px-8 md:py-8">
      <div className="flex flex-col items-start justify-between gap-2 px-2 text-sm md:items-center md:gap-0 md:px-5 md:text-sm lg:flex-row">
        <div className="flex w-full items-center justify-between gap-4 md:gap-5 lg:justify-start">
          <h3 className="font-semibold">注文ID：</h3>
          <p className="font-sans">{order.id}</p>
        </div>
        <div className="flex w-full items-center justify-between gap-4 md:gap-5 lg:justify-start">
          <h3 className="font-semibold">注文日時：</h3>
          <p className="font-sans">{order.createdAt.toLocaleString("ja-JP")}</p>
        </div>
      </div>
      <div className="mt-2 h-[1px] w-full bg-altlight md:mt-4" />

      <div>
        {order.orderItems.map((item) => (
          <div
            className="mt-5 flex items-center gap-5 p-2 text-[0.813rem] md:gap-12 md:p-5 md:text-sm"
            key={item.id}
          >
            <div className="rounded-lg bg-background">
              <Image
                src={item.product.mainImage}
                width={80}
                height={100}
                className="rounded-lg object-contain"
                alt="商品画像"
              />
            </div>
            <div className="flex w-48 flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-nowrap font-bold text-fglighter">
                  商品名：
                </h3>
                <p className="">{item.product.name}</p>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-bold text-fglighter">金額：</h3>
                <p className="font-sans">¥{item.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-bold text-fglighter">数量：</h3>
                <p className="font-sans">{item.quantity.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 flex w-full items-center justify-between px-2 text-sm md:px-5 lg:max-w-80">
          <h3 className="font-semibold">送料：</h3>
          <p className="text-fglight">無料</p>
        </div>
        <div className="mt-1 h-[2px] w-full bg-altlight md:mt-3" />
        <div className="mt-3 flex flex-col gap-3 px-2 md:px-5">
          <div className="flex w-full items-center justify-between text-base md:text-lg lg:max-w-80">
            <h3 className="font-semibold">合計：</h3>
            <p className="font-sans font-medium">
              ¥{order.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
