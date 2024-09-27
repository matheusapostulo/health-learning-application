"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { Contact, DoorClosed, Home, Info, MailPlus, Menu, Search, SquareActivity, X } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CircleUserRound } from 'lucide-react';
import { useState } from "react";
import { Drawer } from "@mui/material";

const navigation = [ 
    { title: "Início", href:"/" }, { title: "Modelos", href:"/modelos" }, { title: "Sobre", href:"/sobre" }, { title: "Contato", href:"/contato" },
]

function comparePath(pathname: string, itemPath: string): Boolean {
    return pathname === itemPath.toLowerCase()
}

export default function Header() {
    const {data: session} = useSession()
    const pathname = usePathname()
     // State para controlar o hamburger
     const [open, setOpen] = useState<boolean | undefined>(false);

    // Função para controlar o menu hamburguer
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    };

    return(
        <header className="fixed h-16 bg-white bg-opacity-90 backdrop-blur-sm md:h-20 drop-shadow-xl w-full text-gray-main">
            {/* Header */}
                <nav className="flex flex-row h-12 items-center space-x-3 justify-between mx-4 my-2 md:mx-8 md:my-4 overflow-hidden">
                    <section className="flex">
                        <Link href="/">
                            <img src="/Logo.svg" className="w-28 sm:w-44" alt="logo-image"/>
                        </Link>
                    </section>
                    <nav className="hidden lg:flex xl:ml-7 lg:ml-4 lg:mr-9">
                        <ol className="lg:flex lg:flex-row xl:gap-[6vw] lg:gap-[4vw] ">
                            {navigation.map((item) => {
                                return(
                                    <li key={item.title}>
                                        <Link href={item.href} className={`${comparePath(pathname, item.href) ? "text-beige-main font-bold": "text-gray-main"} text-sm`}>{item.title}</Link>
                                    </li>
                                )
                            })}
                        </ol>
                    </nav>
                    <section className="bg-transparent border-gray-main rounded-md border min-w-4 flex md:w-68 h-9">
                        <div className="w-8 flex justify-center content-center">
                            <Search size={20} className="self-center font-gray-main ml-2"/>
                        </div>
                        <div className="flex flex-col justify-center w-64">
                            <input type="text" placeholder="Pesquisar" className="bg-transparent h-3/4 ml-2 max-x-fit focus:outline-none text-xs"/>
                        </div>
                    </section>
                    <section className="hidden md:flex items-center md:space-x-4 h-full">
                        {session ? (
                                <CircleUserRound strokeWidth="1" className="h-full w-full"/>
                        ): (
                            <> 
                                <Button href="/login" variant="secondary_outline" size="md">Entrar</Button>
                                <Button href="/signup" variant="secondary" size="md">Criar Conta</Button>
                            </>
                        )}
                    </section>

                    {/* Botão que vai aparecer apenas no mobile, é o menu hamburguer */}
                    <button className=" md:hidden" onClick={toggleDrawer(true)}>
                        <Menu className="text-gray-main"size={28}/>
                    </button>
                    {/* Drawer que abre no mobile */}
                    <Drawer PaperProps={{sx:{borderTopLeftRadius:10, borderBottomLeftRadius:10}}} open={open} onClose={toggleDrawer(false)} anchor="right" transitionDuration={500}>
                        <section className="flex flex-col h-full w-72 mt-14 justify-between">
                            <div>
                                <button className="bg-transparent border-none flex h-10 w-10 justify-center items-center mt-5 ml-3 animate-spin-2 transition-transform duration-300 hover:rotate-180" onClick={toggleDrawer(false)}>
                                    <X className="text-main-gray"></X>
                                </button>
                            </div>
                            <section className="h-full mt-5">
                                <ul className="h-1/3 flex flex-col justify-between px-3">
                                    {navigation.map((item) => {
                                        return(
                                            <div key={item.title} className="flex flex-row items-center h-full space-x-1">
                                                <div className={`${comparePath(pathname, item.href) ?  "bg-beige-main rounded-sm" : null} h-[52%] w-1`}/>
                                                <li className={`${comparePath(pathname, item.href) ?  "bg-beige-main-2 font-semibold" : null} font-medium h-full grow flex flex-row px-[5px] rounded-md text-sm items-center space-x-2`} key={item.title}>
                                                    {item.href == "/" ? <Home strokeWidth="1.3" className="text-gray-main opacity-60"/> : null}
                                                    {item.href == "/modelos" ? <SquareActivity strokeWidth="1.3" className="text-gray-main opacity-60"/>: null}
                                                    {item.href == "/sobre" ? <Info strokeWidth="1.3" className="text-gray-main opacity-60"/> : null}
                                                    {item.href == "/contato" ? <MailPlus strokeWidth="1.3" className="text-gray-main opacity-60"/> : null}
                                                    <Link className="grow" onClick={toggleDrawer(false)} href={item.href} >{item.title}</Link>
                                            </li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </section>
                        </section>
                    </Drawer>
                </nav>
        </header> 
    )
}