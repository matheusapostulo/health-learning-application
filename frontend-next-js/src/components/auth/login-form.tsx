"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { login } from "@/actions/auth";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginSchema } from "@/schemas/auth";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";

export default function LoginForm() {
    const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			userEmail: "",
			password: "",
		},
	});
    
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		startTransition(async () => {
			setError("");
			setSuccess("");
			await new Promise(resolve => setTimeout(resolve,1500))
			try {
				const { success } = await login(values);
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

    return(
        <AuthCard title="Bem vindo ao" titleHiglight="Health Learning" description="Por favor, faça o login na plataforma">
            <div className="space-y-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="space-y-3">
                            <FormField
                                control={form.control}
                                name="userEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                type="email"
                                                placeholder="Seu email"
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                type="password"
                                                placeholder="******"
                                                required
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription className="hidden">Sua senha.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
							{error && <AuthFormMessage type="error" message={error} title="Erro ao fazer login" />}
							{success && <AuthFormMessage type="success" message={success} title="Login feito com sucesso" />}
							<Button type="submit" variant="default" size="lg" className="w-full" disabled={isPending}>
								<LoaderCircle className={!isPending ? "hidden" : "animate-spin mr-2"} />
								<span>Entrar</span>
							</Button>
						</div>
					</form>
				</Form>

				<div className="mt-4 text-center text-sm">
					Ainda não possui conta?{" "}
					<Link href="/signup" className="underline">
						Criar conta
					</Link>
				</div>
			</div>
        </AuthCard>
    )
}
