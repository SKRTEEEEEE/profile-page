
import { client } from "@/app/client";
import { fetchLenguajes } from "@/data/fetch"
import { ConnectButton } from "thirdweb/react";
// import { LenguajesModel } from "@/models/lenguajes-schema";


const TestMongoPage = async( ) =>{
    const lenguajes = await fetchLenguajes()


    return (
        <>
        <p className="mt-36">Hola mundo!</p>
        {lenguajes.map(article => (
            <>
            <p>{article.name}</p>
            <p>{article.afinidad}</p>
            
            
            </>
        ))}
        <ConnectButton client={client}/>

        </>
    )
}

export default TestMongoPage