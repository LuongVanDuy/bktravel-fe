import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      avatar: string;
      type: string;
      isSuperAdmin: number;
      accessToken: string;
      refreshToken: string;
      expiredAt: number;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    avatar: string;
    type: string;
    isSuperAdmin: number;
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
    avatar: string;
    type: string;
    isSuperAdmin: number;
    accessToken: string;
    refreshToken: string;
    expiredAt: number;
  }
}
