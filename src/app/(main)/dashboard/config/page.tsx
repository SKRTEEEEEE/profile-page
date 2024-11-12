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
import { userInCookies } from "@/actions/user";
// import { CConectButton } from "@/components/custom-connect-button";
import UserForm from "@/components/site-header/user-form-dialog";


export default async function EditUserPage() {
  const user = await userInCookies()
  return (
  <main  className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    
    <>
      <UserForm user={user}/>
      
    </>
    
  </main>
  );
}