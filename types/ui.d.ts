import { CommonTechData } from "./global";

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
  

// User 

export type UserData = {
    nick: string;
    address: string;
    isAdmin: boolean;
    solicitudAdmin: boolean;
  }
  
  
  