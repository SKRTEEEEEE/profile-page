import UserForm from "@/components/user-form";
type Params = {
    params: {
      id: string;
    };
  }
export default function EditUserPage({params}:Params) {
    const id = params.id
  return (
  <main  className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <UserForm id={id}/>
    </div>
  </main>
  );
}