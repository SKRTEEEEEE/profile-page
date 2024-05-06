export default function ProjectsDynPage({ params }: { params: { id: number } }) {
    return (
    <main className="w-full flex items-center justify-center">
    <div>My Post: {params.id}</div></main>)
  }