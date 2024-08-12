import { getServerSession } from "next-auth";
import LoginForm from "./components/LoginForm";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ログイン | Amser",
  description: "ログインページ",
};

const LoginPage = async () => {
  if (await getServerSession(authOptions)) {
    redirect("/user");
  }

  return (
    <div className="mb-14 mt-16 font-sans text-foreground md:mb-28">
      <div className="w-full pt-14 md:pt-28">
        <h1 className="text-center text-xl font-bold md:text-2xl">ログイン</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
