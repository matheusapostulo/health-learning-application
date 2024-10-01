import { auth } from "../../../auth"

export default async function Modelos(){
    const session = await auth();
    
    return(
        <div className="flex flex-col justify-center space-y-2 break-words">
            <h1 className="pl-8  text-2xl font-bold">Modelos</h1>
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