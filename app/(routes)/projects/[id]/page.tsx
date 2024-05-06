export default function ProjectsDynPage({ params }: { params: { id: number } }) {
    return (
    <main className="min-h-dvh w-dvw flex items-center justify-center">
    <div>My Post: {params.id}</div></main>)
  }