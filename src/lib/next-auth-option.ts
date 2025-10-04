import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiResponse, httpPost } from "@/lib/http-helper";

export type LoginResult = {
  username: string;
  email: string;
  token: string;
  permissions: string[];
};

export type LoginParam = {
  username: string;
  password: string;
};

export const loginRequest = async (
  param: LoginParam
): Promise<ApiResponse<LoginResult>> => {
  const loginResult = await httpPost<LoginParam, LoginResult>(
    "/api/v1/auth",
    param
  );
  return loginResult;
};

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const loginRes = await loginRequest({
            username: credentials.username,
            password: credentials.password,
          });

          if (!loginRes.success) {
            return null;
          }

          const user = loginRes.data;

          return {
            id: user?.username || "",
            name: user?.username || "",
            email: user?.email,
            accessToken: user?.token || "",
            permissions: user?.permissions.join(","),
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.accessToken = token.accessToken;
        if (session.user) {
          session.user.id = token.id;
          session.user.permissions = token.permissions;
        }
      }
      return session;
    },
  },
};
