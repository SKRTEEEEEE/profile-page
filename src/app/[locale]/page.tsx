import { ToastTest } from "@/components/oth/toast-test";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
//Hay que recojer por searchParams, si el usuario entra por primera vez redirigido del middleware, se le mostrara toast()
type RootProps = {
  searchParams?: Promise<{ 
    redirect: string
   }>
}
export default async function Home({searchParams}:RootProps) {
  const t = await getTranslations("root");
  const redirect = (await searchParams)?.redirect
  const show = redirect === "manageRoot" 

  return (
    <main className="container h-dvh mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-center">{t("h1")}</h1> <br />
        <Link href={"/admin"}>{t("links.admin")}</Link>
        <Link href={"/academia"}>{t("links.academia")}</Link>
        <Link href={"/ceo"}>{t("links.ceo")}</Link>
        <ToastTest show={show} data={{
          title: `${t("manage-root.title")} 🏗️`, 
          description: t("manage-root.description"), 
          duration: 10000}}/>
        
      </div>
    </main>
  );
}
