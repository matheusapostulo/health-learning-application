import NextAuth, {User} from "next-auth";
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
        async jwt({token, user}){
            if(user){
                token.accessToken = user.token;
                token.user = user.user;
            }
            return token;
        },
        async session({session, token}){ 
            if(session.user && token.sub){
                session.accessToken = token.accessToken;
                session.user.user_data = token.user;
            }
            return {
                ...session,
                user: {
                    ...session.user,
                }
            }
        }
    },
    ...authConfig
});