import { auth } from "../../../auth"

export default async function Contato(){
    const session = await auth();
    
    return(
        <div className="flex flex-col px-4 md:px-20 justify-center space-y-2 break-words">
            <h1 className="pl-8 md:pl-28 text-2xl font-bold">Contato</h1>
            <div className="h-80 w-5/6 self-center p-4 bg-yellow-200 overflow-hidden">
                <p>{JSON.stringify(session)}</p>
            </div>
            <div className="h-64 w-5/6 self-center bg-blue-500"></div>
            <div className="h-64 w-5/6 self-center bg-red-400"></div>
            <div className="h-64 w-5/6 self-center bg-yellow-200"></div>
            <div className="h-64 w-5/6 self-center bg-blue-500"></div>
            <div className="h-64 w-5/6 self-center bg-red-400"></div>
            <div className="h-64 w-5/6 self-center bg-yellow-200"></div>
            <div className="h-64 w-5/6 self-center bg-blue-500"></div>
            <div className="h-64 w-5/6 self-center bg-red-400"></div>
        </div>
    )
}