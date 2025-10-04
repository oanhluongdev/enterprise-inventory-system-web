import { authConfig } from "@/lib/next-auth-option";
import NextAuth from "next-auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
