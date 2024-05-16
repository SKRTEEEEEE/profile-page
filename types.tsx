export interface TechLenguajeItem {
  title: string;
  icon: React.ReactElement;
  version: string;
  desc: string;
}

export interface ILenguaje extends Document {
  name: string;
  afinidad: number;
  badge: string;
  preferencia: number;
  color: string;
  experiencia: number;
  frameworks?: IFramework[];
}
export interface IFramework {
  name: string;
  preferencia: number;
  badge:string;
  afinidad: number;
  color: string;
  experiencia: number;
  librerias?: ILibreria[];
}
export interface ILibreria{
  name: string,
  preferencia: number;
  afinidad: number;
  badge: string;
  color: string;
  experiencia: number;
}