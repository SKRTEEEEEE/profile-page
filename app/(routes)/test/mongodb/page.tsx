
import { authedOnly, isAdmin } from "@/actions/auth";
import CConnectButton from "@/components/main/custom-connect-button";
import { fetchLenguajes } from "@/data/fetch"
// import { ConnectButton } from "thirdweb/react";
// import { LenguajesModel } from "@/models/lenguajes-schema";


const TestMongoPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    const admin = await isAdmin()
    console.log("admin: ", admin)
    // // console.log("session: ", session)


    return (
        <>
        <p className="mt-36">Hola mundo!</p>
        {admin ? lenguajes.map(article => (
            <>
            <p>{article.name}</p>
            <p>{article.afinidad}</p>
            
            
            </>
        )):null}
        <CConnectButton/>

        </>
    )
}

export default TestMongoPage