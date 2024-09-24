"use server";

import { RegisterSchema } from "@/schemas/auth";
import type { z } from "zod";

type UserWithoutConfirmPassword = {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

const removeConfirmPassword = (user: z.infer<typeof RegisterSchema>): UserWithoutConfirmPassword => {
    const { confirm_password, ...userWithoutConfirmPassword } = user;
    return userWithoutConfirmPassword;
};

/**
 * This method creates the user for Credentials provider
 * @param {z.infer<typeof RegisterSchema>} user - The new user data.
 * @returns {Promise<{error?: string, success?: string}>} The result of the password change request.
 */
export const register = async (user: z.infer<typeof RegisterSchema>) => {
    // Validate the user data with the schema
    const valid = await RegisterSchema.safeParse(user);
	if (!valid.success) {
		return {
			error: "Dados inválidos",
		};
	}
    // Removing the confirm password from the user object
    const userWithoutConfirmPassword = removeConfirmPassword(user);
    try {
        // Send the user data to the server
        const response = await fetch(`${process.env.API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userWithoutConfirmPassword),
        });
        const data = await response.json();
        if (!response.ok) {
            return { error: data.error_description };
        }

        return { success: "Conta criada com sucesso. Faça o login" };
    } catch(error){
        return { error };
    }
};