"use client"
import { useState } from 'react';
import { dataPortfolio } from '@/data/data';
import Link from 'next/link';

export default function ProjectsPage() {
  const projectsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = dataPortfolio.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(dataPortfolio.length / projectsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
//   console.log(currentPage);
  

  return (
  <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="p-4 text-3xl xl:text-4xl font-bold mb-8">Mis proyectos web de muestra desplegados:</h1>
      <ul className="w-11/12 xl:w-9/12 flex flex-col gap-4">
        {currentProjects.map((data) => (
          <li className="flex justify-between" key={data.id}>
            <h2 className='text-md xl:text-2xl'>{data.title}</h2>
            <div className='flex'> 
            {data?.urlDemo&&<Link className='mr-4 px-2 py-1 border-2 border-primary-200 rounded-md bg-secondary-300/50 hover:bg-secondary-600 hover:border-primary-400/80 sm:inline hidden' href={data.urlDemo} target='_blank'>Ir <span className="hidden xl:inline">al proyecto</span>🧑‍💻</Link>}
            {data?.urlGithub&&<Link className='mr-4 px-2 py-1 border-2 border-primary-200 rounded-md bg-secondary-300/50 hover:bg-secondary-600 hover:border-primary-400/80 sm:inline hidden' href={data.urlGithub} target='_blank'><span className="hidden xl:inline">Ver </span>Código📄</Link>} 
            <Link className='px-2 py-1 border-2 border-primary-200 rounded-md bg-secondary-400/30 hover:bg-secondary-600 hover:border-primary-400/80' href={`projects/${data.id}`}>Info <span className="hidden lg:inline mr-4">del proyecto</span>➡️</Link></div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex gap-4">
        <button
          onClick={goToPrevPage}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? 'bg-danger/10 text-primary-100/30 cursor-not-allowed' : 'border-secondary-200/80 hover:border-secondary-300 border-2 bg-primary-500/40 hover:bg-primary-800/80 text-primary-100'
          }`}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={goToNextPage}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? 'bg-danger/10 text-primary-100/30 cursor-not-allowed' : 'border-secondary-200/80 hover:border-secondary-300 border-2 bg-primary-500/40 hover:bg-primary-800/80 text-primary-100'
          }`}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
