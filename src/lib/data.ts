export const creatorData = {
  githubUrl: "https://github.com/SKRTEEEEEE",
  email: "adanreh.m@gmail.com",
  emailTo: `mailto:adanreh.m@gmail.com`,
  twitter: "https://x.com/queen420nft",
  profileWebUrl: "https://profile-skrt.vercel.app"
}
const getMetadataSection = (options: {name: string, desc:string}) => {
  return {
      name: options.name,
      url: creatorData.profileWebUrl,
      description: options.desc,
      author: "Adan Reh",
      links:{
          twitter: creatorData.twitter,
          github: creatorData.githubUrl,
          personalSite: creatorData.profileWebUrl
      }
  }
}
export const metadataMain = getMetadataSection({name: "SkrtPage",desc: "Nextjs 15 profile programmer page"})
export const metadataBlog = getMetadataSection({name: "SkrtBlog",desc: "NextJs 15 exercises blog"})
export const metadataAdmin = getMetadataSection({name: "SkrtAdmin",desc: "NextJs 15 admin dashboard for the page"})


//Hardcoded data not translated
export const plansBasicInfo = [
    {
      name: "Plan Gratuito",
      description: "Perfecto para comenzar",
      price: "0€",
      period: "mes",
      subtitle: "🎉 Subscribe para comenzar !",
      features: [
        "Acceso a cursos profesionales",
        "Acceso a multiples ejercicios",
        "Foro de la comunidad",
        "Recursos de aprendizaje básicos",
        // "Actualizaciones mensuales de contenido",
      ],
    },
    {
      name: "Plan Básico",
      description: "Ideal para estudiantes dedicados",
      price: "9.99€",
      period: "mes",
      subtitle: "💶 Ahora, primer mes GRATIS !",
      features: [
        "Todo lo incluido en el Plan Gratuito",
        "Acceso a cursos exclusivos",
        "Descuentos exclusivos de la comunidad",
        "Soporte por email",
      ],
      extraFeatures: [
        "Acceso a foro exclusivo",
        "Acceso a ejercicios exclusivos",
        // "Descuentos en suscripciones a cursos",
        "Recursos de aprendizaje gratuitos/incluidos"
      ],
    },
    {
      name: "Plan Premium",
      description: "Para profesionales y expertos",
      price: "19.99€",
      period: "mes",
      subtitle: "🧰 Primer mes, solo 10€ !",
      features: [
        "Todo lo incluido en el Plan Básico",
        // "Mentorías personalizadas incluidas",
        "Soporte prioritario 24/7",
        "Acceso a todos los cursos",
        "Acceso a todos los ejercicios",
        // "Suscripción a cursos incluida",
  
      ],
      extraFeatures: [
        "Voto para elección de próximos ejercicios",
        "Descarga de contenido offline",
      ],
    },
  ]

