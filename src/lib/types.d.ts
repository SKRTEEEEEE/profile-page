
// TECH DATA

export type CommonTechData = {
    name: string,
    preferencia: number;
    afinidad: number;
    badge: string;
    color: string;
    experiencia: number;
    img: string;
}
//tech-formulario.tsx useAsyncList autocomplete
export type TechBadge = {
    name: string;
};
// isFw isLeng (Para los)
export type LenguajesDispo = {
    name: string;
  }
  export type FrameworksDispo = {
    name: string;
  }
// Techs data
export interface FrameworkData extends CommonTechData {
    lenguajeTo: string;
  }
export interface LibreriaData extends CommonTechData {
    lenguajeTo: string;
    frameworkTo: string;
}

// Full tech data
export interface FullTechData extends CommonTechData {
    value: string; 
    valueexp: string; 
    isFw: boolean|string; 
    isLib: boolean|string; 
    usogithub?: number; 
    
  }
// Other tech data 
export type TechLenguajeItem = {
    title: string;
    icon: React.ReactElement;
    version: string;
    desc: string;
  }
// USER DATA
export type UserData = {
    nick: string;
    address: string;
    isAdmin: boolean;
    solicitudAdmin: boolean;
    img?: string;
  }
// ADMIN DATA
export type AdminData = {
  userId: Types.ObjectId;
  address: String;
  createdAt?: Date;
  updatedAt?: Date;
}
  
  
// Site config data
export type DataSiteConfig = {
  logo: {
      path: string;
      render: JSX.Element;
  };
  paths: {
      id: string;
      path: string;
      title: string;
  }[];
  icons: {
    id: string;
    path: string;
    title: string;
    render: JSX.Element;
    blank: boolean;
}[];
}