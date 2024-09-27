import { auth } from "../../../auth"

export default async function Modelos(){
    const session = await auth();
    
    return(
        <h1 className=" break-words">{JSON.stringify(session)}</h1>
    )
}