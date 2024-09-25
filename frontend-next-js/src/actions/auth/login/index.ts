"use server";

import { LoginSchema } from "@/schemas/auth";
import type { z } from "zod";
import { signIn } from "../../../../auth";

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
    const success = "Conta criada com sucesso. Faça o login";
    const error = "Algo deu errado. Tente novamente.";

    try {
        const {userEmail, password} = validCredentials.data;
        // Send the user data to the server
        const response = await signIn("credentials", {
            userEmail,
            password,
            redirectTo: "/",
        })
        

        return { success: "Conta criada com sucesso. Faça o login" };
    } catch(error){
        return { error };
    }
};