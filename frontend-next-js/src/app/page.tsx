'use client';

import { Button, buttonVariants } from "@/components/Button";
import { useRef } from "react";

export default function Home() { 
  const ref = useRef<null | HTMLButtonElement>(null);

  return (
    <>
      <div className="flex flex-col justify-center">
        <p className="text-black-200 text-lg">conteúdo</p>
      </div>
      <Button variant="default" size="lg">Criar Conta</Button>
    </>
  );
}
