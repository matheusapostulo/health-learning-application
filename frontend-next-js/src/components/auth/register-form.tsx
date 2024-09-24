"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { promise, type z } from "zod";

import { register } from "@/actions/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterSchema } from "@/schemas/auth";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";

export default function RegisterForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			lastName: "",
			email: "",
			password: "",
			confirm_password: ""
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		startTransition(async () => {
			setError("");
			setSuccess("");
			await new Promise(resolve => setTimeout(resolve,1500)) // Dando um timeout para gerar a visualização 
			try {
				const { success, error } = await register(values);
				if (error){
					setError(error);
					return;
				};
				setSuccess(success || "");
				setTimeout(() => {
					setSuccess("");
					form.reset();
					router.push("/login");
				}, 2000);
			} catch (error) {
				setSuccess("");
				setError("Algo deu errado. Tente novamente.");
			}
		});
	};

	return (
		<AuthCard title="Criar conta">
			<div className="space-y-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-3">
							<div className="flex flex-row space-x-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input
													autoComplete="off"
													type="name"
													placeholder="Seu nome"
													required
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<FormDescription className="hidden">Seu nome.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Sobrenome</FormLabel>
											<FormControl>
												<Input
													autoComplete="off"
													type="lastname"
													placeholder="Seu sobrenome"
													required
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<FormDescription className="hidden">Seu sobrenome.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>E-mail</FormLabel>
										<FormControl>
											<Input type="email" placeholder="voce@seuemail.com" required {...field} disabled={isPending} />
										</FormControl>
										<FormDescription className="hidden">Seu e-mail.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<Input type="password" placeholder="******" required {...field} disabled={isPending} />
										</FormControl>
										<FormDescription className="hidden">Sua Senha.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirm_password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirmar Senha</FormLabel>
										<FormControl>
											<Input type="password" placeholder="******" required {...field} disabled={isPending} />
										</FormControl>
										<FormDescription className="hidden">Confirme sua senha.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							{error && <AuthFormMessage type="error" message={error} title="Erro ao criar conta" />}
							{success && <AuthFormMessage type="success" message={success} title="Conta criada" />}
							<Button type="submit" variant="default" size="lg" className="w-full" disabled={isPending}>
								<LoaderCircle className={!isPending ? "hidden" : "animate-spin mr-2"} />
								<span>Criar conta</span>
							</Button>
						</div>
					</form>
				</Form>

				<div className="mt-4 text-center text-sm">
					Já tem uma conta?{" "}
					<Link href="/login" className="underline">
						Efetue Login
					</Link>
				</div>
			</div>
		</AuthCard>
	);
}