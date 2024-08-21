import { getCookies } from "@/actions/auth";
import CConnectButton from "@/components/main/custom-connect-button";
import OnlyAdminView from "@/components/main/only-admin";
import { UploadthingButton } from "@/components/routes/uploadthing-button";
import { fetchLenguajes } from "@/data/fetch"


const TestMongoPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    const user = await getCookies()
    console.log("user: ", user)


    return (
        <>
        <OnlyAdminView>
        <p className="mt-36">Hola mundo!</p>
        {user&&<UploadthingButton/>}
        {user ? lenguajes.map(article => (
            <>
            <p>{article.name}</p>
            <p>{article.afinidad}</p>
            
            
            </>
        )):null}
        <CConnectButton/>
        </OnlyAdminView>
        </>
    )
}

export default TestMongoPage