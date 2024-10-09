"use client";

import React from 'react';
import Link from "next/link"
import { Button } from "./ui/button"
import { Bell, Search} from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Headroom from 'react-headroom';
import { SearchBar } from "./ui/search-bar";
import Image from "next/image";
import { Turn as Hamburger} from "hamburger-react";
import { MenuHamburger } from "./ui/menu-hamburger";

const navigation = [ 
    { title: "Início", href:"/" }, { title: "Modelos", href:"/modelos" }, { title: "Sobre", href:"/sobre" }, { title: "Contato", href:"/contato" },
]

function comparePath(pathname: string, itemPath: string): boolean {
    return pathname.toLowerCase() === itemPath.toLowerCase()
}

const Header: React.FC = () => {
    const {data: session} = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const reload: boolean = searchParams.has("reload");
    // State para controlar o hamburger
    const [open, setOpen] = React.useState<boolean>(false);
    const [openSearchBar, setSearchBar] = React.useState<boolean>(false);

    // Função para controlar o menu hamburguer
    const toggleDrawer = () => {
        setOpen(!open)
    };

    const toggleSearchBar = () => {
        setSearchBar(!openSearchBar)
    }

    // Adding the class to the body when the Drawer is open
    React.useEffect(() => {
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

    // Updating the components in the screen when the user signsOut or signIn
    React.useEffect(() => {
        if(reload){
            router.push(pathname);
    		setTimeout(() => {
    			window.location.reload()
    		}, 300);
        }
    },[reload])

    return(
        <>
        <Headroom
            style={{
                WebkitTransition: 'all 1s ease-in-out',
                zIndex: 20
            }}
        >
            <header className={`flex flex-col justify-center h-16 bg-white w-full text-gray-main  ${open ? "backdrop-blur-none bg-opacity-0" : "backdrop-blur-sm bg-opacity-90"}`}>
                {/* Header */}
                    <nav className="flex flex-row h-10 items-center md:space-x-3 mx-4 md:mx-24 md:justify-between overflow-hidden">    
                        <Link href="/" onClick={open ? toggleDrawer : undefined}>
                            <Image src={"/Logo.svg"} width={110} height={40} alt="Logo-image"></Image>
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
                                <section className="hidden md:flex bg-gray-200 rounded-md  min-w-4 md:w-68 h-9">
                                    <div className="w-8 flex justify-center content-center">
                                        <Search strokeWidth={2.2} size={20} color="gray" className="self-center"/>
                                    </div>
                                    <div className="flex flex-col justify-center w-64">
                                        <input type="text" placeholder="Pesquisar" className="bg-transparent h-3/4 ml-2 max-x-fit focus:outline-none text-xs"/>
                                    </div>
                                </section>
                                <button className="md:hidden ml-auto mr-4" onClick={toggleSearchBar}>
                                    <Search size={20} className="font-gray-main"/>
                                </button>
                            </>
                        }
                        <section className="flex items-center space-x-4 md:space-x-5 mr-2 md:mr-0 h-full">
                            {session ? (
                                !open && 
                                <>
                                    <Bell size={22.5} strokeWidth={1.5} color="#333333"/>
                                    <div className="h-8 w-8 md:w-9 md:h-9 mr-2 relative flex items-center">
                                        <Image src={"/imagem_perfil_full.jpg"} fill={true} alt="user-image" className="rounded-full object-cover"/>
                                    </div>  
                                </>                              
                            ): (
                                !open &&
                                <> 
                                    <Button href="/login" variant="secondary_outline" size="sm">Entrar</Button>
                                    <Button href="/signup" variant="secondary" size="sm" className="hidden md:flex">Criar Conta</Button>
                                </>
                            )}
                        </section>

                        {/* Botton that will only appear on mobile, it's the hamburger menu */} 
                        <div className={`md:hidden flex items-center h-8 rounded-md order-first mr-2`} >                            
                            <Hamburger size={20} duration={0.4} distance="md" color="#333333" rounded toggled={open} onToggle={toggleDrawer}/>
                        </div>  

                    </nav>
            </header>
        </Headroom>

        {open ? 
            <MenuHamburger pathname={pathname} navigationData={navigation} comparePath={comparePath} toggleDrawer={toggleDrawer}/>
        : null}

        <SearchBar isSearchBarOpen={openSearchBar} toggleSearchBar={toggleSearchBar}/>
        </>
    )
}

export default Header;