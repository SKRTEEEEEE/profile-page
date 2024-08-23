// import UserForm from "@/components/user-form";
// type Params = {
//     params: {
//       id: string;
//     };
//   }
// export default function EditUserPage({params}:Params) {
//     const id = params.id
//   return (
//   <main  className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//     <UserForm id={id}/>
//     </div>
//   </main>
//   );
// }
import UserForm from "@/components/user-form";
import { ProtLogRou } from "@/core/application/usecases/auth";
import { authRepository } from "@/core/infrastructure/repositories/thirdweb-auth-repository";

export default async function EditUserPage() {
  const getAddress = new ProtLogRou(authRepository)
  const jwt = await getAddress.execute("/")
  console.log("jwt: ", jwt)
  return (
  <main  className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <UserForm jwt={jwt}/>
    </div>
  </main>
  );
}