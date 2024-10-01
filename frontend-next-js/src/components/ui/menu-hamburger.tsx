import { Home, Info, MailPlus, SquareActivity } from "lucide-react";
import Link from "next/link";
import * as React from "react"

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    pathname: string;
    navigationData: { title: string, href: string }[];
    comparePath: (pathname: string, itemPath: string) => Boolean;
    toggleDrawer: () => void;
}

const MenuHamburger = React.forwardRef<HTMLDivElement, SearchBarProps>(({ className, pathname, navigationData, comparePath, toggleDrawer, ...props }, ref) => {
    return(
        <section className={`fixed mt-20 bottom-0 bg-white bg-opacity-40 backdrop-blur-2xl h-full w-full`}>
            <section className="flex flex-col h-full mt-20 ml-2 justify-between animate-fade">
                <section className="h-full mt-10">
                    <ul className="h-1/3 flex flex-col justify-between px-3 space-y-8">
                        {navigationData.map((item) => {
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
                                        <Link className="grow" onClick={toggleDrawer} href={item.href}>{item.title}</Link>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </section>
            </section>
        </section> 
    );

})

MenuHamburger.displayName = "SearchBar"

export { MenuHamburger }