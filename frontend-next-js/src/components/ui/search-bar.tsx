import { Drawer } from "@mui/material"
import { Search } from "lucide-react";
import * as React from "react"

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    isSearchBarOpen: boolean;
    toggleSearchBar: () => void;
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(({ className, isSearchBarOpen, toggleSearchBar, ...props }, ref) => {
    return(
        <Drawer 
            PaperProps={{          
                className: "h-3/5 rounded-xl",         
            }} 
            open={isSearchBarOpen} onClose={toggleSearchBar} 
            anchor="top" 
            transitionDuration={300}
        >
            <section className="flex flex-col h-full mt-6 mx-4">
                <section className="flex bg-gray-200 rounded-md border min-w-4 md:w-68 h-9">
                    <div className="w-8 flex justify-center content-center">
                        <Search strokeWidth={2.2} size={20} color="gray" className="self-center"/>
                    </div>
                    <div className="flex flex-col justify-center w-64">
                        <input type="text" placeholder="Pesquisar" className="bg-transparent h-3/4 ml-2 max-x-fit focus:outline-none text-xs"/>
                    </div>
                </section>
            </section>
        </Drawer>
    );

})

SearchBar.displayName = "SearchBar"

export { SearchBar }