import NextAuth from "next-auth";
import { options } from "@/utils/nextAuth";

const handler = NextAuth(options);

export {handler as GET,handler as POST}
