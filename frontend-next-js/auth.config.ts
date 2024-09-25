import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas/auth";
import Credentials from "next-auth/providers/credentials";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validCredentials = LoginSchema.safeParse(credentials);
                if (validCredentials.success) {
                    const {email, password} = credentials;
                    const user = await fetch(`${process.env.API_URL}/users`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(validCredentials.data),
                    });
                    console.log(user);
                }
                return null;
            },
        })
    ]
} satisfies NextAuthConfig;