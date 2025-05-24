
import { VerificacionEmailAlert } from "@/components/verify-email/verificacion-email-alert";
import {  RenderAlert, VerifyEmailConfirmDialog } from "@/components/verify-email/verify-email-dialogs";
import { apiReadUserByIdUC, mongooseListUsersByIdUC } from "@/core/application/usecases/entities/user";
import { verifyEmailCMongoose } from "@/core/presentation/controllers/user";
import { Suspense } from "react";

// ⚠️🚧 Hay que terminar el verifyEmailCMongoose a api

type SearchParams = {
  verifyToken?: string;
  id?: string;
}

type PageProps = {
  searchParams: SearchParams;
}


async function VerifyEmailContent({ verifyToken, id }: SearchParams) {
  if (!verifyToken || !id) {
    return <RenderAlert title="URL Invalida"  description="Esta pagina no contiene contenido."/>
  }

  // const user = await mongooseListUsersByIdUC(id)
  const user = await apiReadUserByIdUC(id)
  if (!user) {
    return <RenderAlert title="URL Invalida"  description="Si estas tratando de validar el email, intenta-lo después."/>
  } else if (user.verifyToken == verifyToken) {
    const result = await verifyEmailCMongoose(id, verifyToken);

    if (result) {
      return (
        <VerifyEmailConfirmDialog />)
    } else {
      return (
        <VerificacionEmailAlert user={user} />
      );
    }
  } else if (user.verifyToken !== undefined) {
    return (
      <VerificacionEmailAlert user={user} />
    );
  } else {
    return <RenderAlert title="URL Invalida"  description="Si estas tratando de validar el email, intenta-lo después."/>
  }
}


export default async function VerifyEmailPage(props: PageProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <Suspense fallback={<div>Verifying your email address. Please wait...</div>}>
          <VerifyEmailContent {...searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
