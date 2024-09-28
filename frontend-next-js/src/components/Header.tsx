"use client";

import Link from "next/link"
import { Button } from "./ui/button"
import { Home, Info, MailPlus, Menu, Search, SquareActivity, X } from 'lucide-react';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Headroom from 'react-headroom';
import { SearchBar } from "./ui/search-bar";


const navigation = [ 
    { title: "Início", href:"/" }, { title: "Modelos", href:"/modelos" }, { title: "Sobre", href:"/sobre" }, { title: "Contato", href:"/contato" },
]

function comparePath(pathname: string, itemPath: string): Boolean {
    return pathname.toLowerCase() === itemPath.toLowerCase()
}

export default function Header() {
    const {data: session} = useSession()
    const pathname = usePathname()
     // State para controlar o hamburger
     const [open, setOpen] = useState<boolean>(false);
     const [openSearchBar, setSearchBar] = useState<boolean>(false);

    // Função para controlar o menu hamburguer
    const toggleDrawer = () => () => {
        setOpen(!open)
    };

    const toggleSearchBar = () => () => {
        setSearchBar(!openSearchBar)
    }

    useEffect(() => {
        if (open) {
            // Adiciona a classe quando a Drawer está aberta
            document.body.classList.add("overflow-hidden");
        } else {
            // Remove a classe quando a Drawer está fechada
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [open]);

    return(
        <>
        <Headroom
            style={{
                    WebkitTransition: 'all 1s ease-in-out',

                }}
        >
            <header className={`flex flex-col justify-center h-16 bg-white w-full text-gray-main  ${open ? "backdrop-blur-none bg-opacity-0" : "backdrop-blur-sm bg-opacity-90"}`}>
                {/* Header */}
                    <nav className="flex flex-row h-10 items-center md:space-x-3 mx-4 md:mx-20 md:justify-between overflow-hidden">    
                        <Link href="/" onClick={open ? toggleDrawer() : undefined}>
                            <img src="/Logo.svg" className="max-w-28 max-h-28" alt="logo-image"/>
                        </Link>
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
                        {!open &&
                            <>
                                <section className="hidden md:flex bg-transparent border-gray-main rounded-md border min-w-4 md:w-68 h-8">
                                    <div className="w-8 flex justify-center content-center">
                                        <Search size={20} className="self-center font-gray-main"/>
                                    </div>
                                    <div className="flex flex-col justify-center w-64">
                                        <input type="text" placeholder="Pesquisar" className="bg-transparent h-3/4 ml-2 max-x-fit focus:outline-none text-xs"/>
                                    </div>
                                </section>
                                <section className="md:hidden ml-auto mr-4" onClick={toggleSearchBar()}>
                                    <Search size={20} className="font-gray-main"/>
                                </section>
                            </>
                        }
                        <section className="hidden md:flex items-center md:space-x-4 h-full">
                            {!session ? (
                                <>
                                    {/* <CircleUserRound strokeWidth="1" className="h-full w-full"/> */}
                                    <img src={"/imagem_perfil_full.jpg"} alt="user-image" className="h-8 w-8 rounded-full"/>
                                </>
                            ): (
                                <> 
                                    <Button href="/login" variant="secondary_outline" size="sm">Entrar</Button>
                                    <Button href="/signup" variant="secondary" size="sm">Criar Conta</Button>
                                </>
                            )}
                        </section>

                        {/* Botton that will only appear on mobile, it's the hamburger menu */} 
                        <button className={`md:hidden ${open? "ml-auto" : ""}`} onClick={toggleDrawer()}>
                            {open ? <X className="text-gray-main" size={28} /> : <Menu className="text-gray-main"size={28}/>}
                        </button>                    
                    </nav>
            </header>
        </Headroom> 
        {open ? 
            <section className={`fixed mt-20 bottom-0 bg-white bg-opacity-40 backdrop-blur-2xl h-full w-full`}>
                <section className="flex flex-col h-full mt-20 ml-2 justify-between animate-fade">
                    <section className="h-full mt-10">
                        <ul className="h-1/3 flex flex-col justify-between px-3 space-y-8">
                        {navigation.map((item) => {
                            const isActive = comparePath(pathname, item.href); // Armazena o resultado da comparação

                            return (
                                <div key={item.title} className="flex flex-row items-center h-full space-x-2">
                                    <li className={`${isActive ? "font-extrabold" : "font-light"} h-full grow flex flex-row px-[5px] rounded-md text-2xl items-center space-x-2`}>
                                        {item.href === "/" ? 
                                            <Home strokeWidth={isActive ? "2" : "1.5"} size={30} className={`text-gray-main opacity-60 ${isActive ? "font-extrabold opacity-90" : ""}`} /> 
                                            : null}
                                        {item.href === "/modelos" ? 
                                            <SquareActivity size={31} strokeWidth={isActive ? "2" : "1.5"} className={`text-gray-main opacity-60 ${isActive ? "font-extrabold opacity-90" : ""}`} /> 
                                            : null}
                                        {item.href === "/sobre" ? 
                                            <Info strokeWidth={isActive ? "2" : "1.5"} size={30} className={`text-gray-main opacity-60 ${isActive ? "font-extrabold opacity-90" : ""}`} /> 
                                            : null}
                                        {item.href === "/contato" ? 
                                            <MailPlus strokeWidth={isActive ? "2" : "1.5"} size={30} className={`text-gray-main opacity-60 ${isActive ? "font-extrabold opacity-90" : ""}`} /> 
                                            : null}
                                        <Link className="grow" onClick={toggleDrawer()} href={item.href}>{item.title}</Link>
                                    </li>
                                </div>
                            );
                        })}
                        </ul>
                    </section>
                </section>
            </section> 
        : null}
        <SearchBar isSearchBarOpen={openSearchBar} toggleSearchBar={toggleSearchBar()}/>
        </>
    )
}