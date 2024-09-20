import Image from "next/image"
import Link from "next/link"
import { Button } from "./Button"

const navigation = [ 
    { title: "início", href:"/" }, { title: "modelos", href:"/Teste" }, { title: "sobre", href:"teste" }, { title: "contato", href:"teste" },
]

export default function Header() {
    return(
        <header className="flex flex-col bg-white h-20 drop-shadow-xl justify-center w-full">
            <nav className="flex flex-row h-10 items-center justify-between mx-8 overflow-hidden">
                <section className="">
                    <img src="/Logo.svg" className="w-32 sm:w-44" alt="logo-image"/>
                </section>
                <nav className="xl:ml-10 lg:ml-4 lg:mr-9">
                    <ol className="hidden lg:flex lg:flex-row uppercase xl:gap-[7vw] lg:gap-[4vw] ">
                        {navigation.map((item) => {
                            return(
                                <li key={item.title}>
                                    <Link href={item.href} className={`font-normal text-sm`}>{item.title}</Link>
                                </li>
                            )
                        })}
                    </ol>
                </nav>
                <section className="lg:border border-gray-main rounded-md w-40 xl:w-56 h-4/5"/>
                <section className="hidden md:flex md:space-x-4">
                    <Button href="/Teste" variant="secondary_outline" size="md">Entrar</Button>
                    <Button href="/Teste" variant="secondary" size="md">Criar Conta</Button>
                </section>
            </nav>
        </header> 
    )
}