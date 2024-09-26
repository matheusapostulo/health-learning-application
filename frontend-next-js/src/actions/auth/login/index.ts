"use server";

import { LoginSchema } from "@/schemas/auth";
import type { z } from "zod";
import { signIn } from "../../../../auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { UserNotFoundError } from "@/lib/auth/user-not-found";
import { InvalidCredentials } from "@/lib/auth/invalid-credentials";

// type UserWithoutConfirmPassword = {
//     name: string;
//     lastName: string;
//     email: string;
//     password: string;
// }

// const removeConfirmPassword = (user: z.infer<typeof RegisterSchema>): UserWithoutConfirmPassword => {
//     const { confirm_password, ...userWithoutConfirmPassword } = user;
//     return userWithoutConfirmPassword;
// };

/**
 * This method creates the user for Credentials provider
 * @param {z.infer<typeof LoginSchema>} user - The new user data.
 * @returns {Promise<{error?: string, success?: string}>} The result of the password change request.
 */
export const login = async (user: z.infer<typeof LoginSchema>) => {
    // Validate the user data with the schema
    const validCredentials = await LoginSchema.safeParse(user);
	if (!validCredentials.success) {
		return {
			error: "Dados inválidos",
		};
	}

    try {
        const {userEmail, password} = validCredentials.data;
        // Send the user data to the server
        await signIn("credentials", {
            userEmail,
            password,
            redirect: false
        })
        
        return { success: "Login feito com sucesso" };
    } catch(error){
        if (error instanceof AuthError) {
            if(error instanceof UserNotFoundError){
                return {
                    error: "Usuário não encontrado",
                }
            } else if(error instanceof InvalidCredentials){
                return {
                    error: "Credenciais inválidas",
                }
            }
		}   
        throw error;
    }
};