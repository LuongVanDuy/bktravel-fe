import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { fetchApi } from "@/helper/api";

export async function refreshAccessToken(tokenObject: any) {
  try {
    const tokenResponse = await fetchApi("refresh-token", "POST", {
      token: tokenObject.refreshToken,
    });

    return {
      ...tokenObject,
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
      expiredAt: tokenResponse.expiredAt,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const body = {
            email: credentials?.email,
            password: credentials?.password,
          };

          const data = await fetchApi("login", "POST", body);

          if (data?.accessToken) {
            return {
              id: data.id,
              email: data.email,
              username: data.name,
              avatar: data.avatar,
              type: data.type,
              isSuperAdmin: data.isSuperAdmin,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiredAt: data.expiredAt,
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.avatar = user.avatar;
        token.type = user.type;
        token.isSuperAdmin = user.isSuperAdmin;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiredAt = user.expiredAt;
      }

      const shouldRefreshTime = Math.round(token.expiredAt - 60 * 60 - Date.now() / 1000);

      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }

      token = await refreshAccessToken(token);
      return Promise.resolve(token);
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.avatar = token.avatar;
        session.user.type = token.type;
        session.user.isSuperAdmin = token.isSuperAdmin;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.expiredAt = token.expiredAt;
      }
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
