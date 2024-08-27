import Link from "next/link";

export default function Home() {
  return (
  <main  className="container h-dvh mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <h1>This is the home page</h1>
      <Link href={"/dashboard/config"}>Ir al dashboard config</Link>
      <Link href={"/admin/users"}>Ir a admin users</Link>
      <Link href={"/test"}>Ir a test page</Link>
    </div>
  </main>
  );
}
