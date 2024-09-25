import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
    unstable_update: update,
} = NextAuth({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login"
    },
    callbacks:{
    
    },
    ...authConfig
});