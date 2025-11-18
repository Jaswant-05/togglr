import { config } from "@workspace/auth";
import NextAuth, { NextAuthResult } from "next-auth";

const result = NextAuth(config);

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;