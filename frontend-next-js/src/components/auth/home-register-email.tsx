"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterHomeWithEmailSchema } from "@/schemas/auth";


export default function HomeRegisterEmail() {
    const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof RegisterHomeWithEmailSchema>>({
		resolver: zodResolver(RegisterHomeWithEmailSchema),
		defaultValues: {
			email: "",
		},
	});
    
    const onSubmit = async (values: z.infer<typeof RegisterHomeWithEmailSchema>) => {
		startTransition(async () => {
            // Simulando uma operação assíncrona como uma requisição
            return new Promise((resolve) => {
                setTimeout(() => {
                    form.reset();
                    const encodedEmail = encodeURIComponent(values.email);
                    router.push(`/signup?email=${encodedEmail}`);
                    resolve(undefined); // Resolva a promise para finalizar a transição
                }, 1500);
            });
		});
	};

    return(
        <Form {...form}>
            <form className="flex flex-row" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        autoComplete="on"
                                        type="email"
                                        placeholder="voce@email.com"
                                        required
                                        {...field}
                                        disabled={isPending}
                                        className="h-full rounded-r-none focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-offset-1"
                                    />
                                </FormControl>
                                <FormDescription className="hidden">Seu email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="default" size="md" className="mt-0 mr-1 rounded-l-none px-4 sm:px-7" disabled={isPending}>
                        <LoaderCircle className={!isPending ? "hidden" : "animate-spin mr-2"} />
                        <span>{!isPending? "Criar conta" : ""}</span>
                    </Button>
            </form>
        </Form>
    )
}
