import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas/auth";
import Credentials from "next-auth/providers/credentials";
import { isDataView } from "util/types";
import { UserNotFoundError } from "@/lib/auth/user-not-found";
import { InvalidCredentials } from "@/lib/auth/invalid-credentials";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validCredentials = LoginSchema.safeParse(credentials);
                if (validCredentials.success) {
                    // const {userEmail, password} = validCredentials.data;
                    const res = await fetch(`${process.env.API_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(validCredentials.data),
                    });
                    const resJson = await res.json();

                    if (!res.ok) {
                        if(resJson.error_code == 'NOT_FOUND'){
                            throw new UserNotFoundError();
                        } else if(resJson.error_code == 'INVALID_PASSWORD'){
                            throw new InvalidCredentials();
                        }
                    }

                    return resJson;
                }
                return null;
            },
        })
    ]
} satisfies NextAuthConfig;