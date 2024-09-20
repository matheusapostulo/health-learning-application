"use client" // Context's must to be client components
import { createContext, useContext, useState} from "react"
import Header from "../../components/Header";


// Crearting our context
export const HeaderContext = createContext<any>(undefined);

// Creating a hook to use our context
export const useHeader = () => {
    const context = useContext(HeaderContext)

    // If we don't have a valid context we'll throw a error
    if(!context){
        throw new Error("useHeader must be used within a HeaderProvider")
    }

    return context;
}

export function HeaderProvider({children} : {children:React.ReactNode;}){
    let [simple, setSimple] = useState('carregando');

    return(
        <HeaderContext.Provider value={{simple, setSimple}}>
            <Header/>
            {children}
        </HeaderContext.Provider>  
    )
}



