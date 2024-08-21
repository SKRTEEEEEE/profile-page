import UserForm from "@/components/user-form";
import UsersTable from "@/components/users-table";

export default function Home() {
  return (
  <main  className="container h-dvh mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <UserForm/>
    <UsersTable/>
    </div>
  </main>
  );
}
