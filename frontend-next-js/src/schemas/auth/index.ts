import {z} from "zod";

export const RegisterSchema = z.object({
	name: z.string().min(3, "O nome precisa de no mínimo 4 caracteres").trim(),
	lastName: z.string().min(3, "O sobrenome precisa de no mínimo 4 caracteres").trim(),
	email: z.string().email("Formato de email inválido").trim(),
	password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres")
		.regex(/[a-z]/, "A senha precisa de no mínimo uma letra minúscula")
		.regex(/[A-Z]/, "A senha precisa de no mínimo uma letra maiúscula")
		.regex(/[0-9]/, "A senha precisa de no mínimo um número")
		.regex(/[^a-zA-Z0-9]/, "A senha precisa de no mínimo um caractere especial"),	
	confirm_password: z.string().min(6, "A senha precisa de no mínimo 6 caracteres")
}).refine(data => data.password === data.confirm_password, {
	message: "As senhas não são iguais",
	path: ["confirm_password"]
});

export const LoginSchema = z.object({
	userEmail: z.string().email("Formato de email inválido").trim(),
	password: z.string()
});

export const RegisterHomeWithEmailSchema = z.object({
	email: z.string().email("Formato de email inválido").trim()
})

