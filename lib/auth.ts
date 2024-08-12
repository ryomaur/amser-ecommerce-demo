import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";
import { Adapter } from "next-auth/adapters";
import { mergeAnonCartIntoUserCart } from "@/actions/cart";
import { mergeAnonWishlistIntoUserWishlist } from "@/actions/wishlist";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("無効な認証情報");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("ユーザーが存在しません");
        }

        const isCorrectPassword = await bcrypt.compare(
          String(credentials.password),
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("パスワードが一致しません");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        return {
          ...token,
          id: user.id,
          isAdmin: dbUser?.isAdmin,
        };
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
        },
      };
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonCartIntoUserCart(user.id);
      await mergeAnonWishlistIntoUserWishlist(user.id);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
