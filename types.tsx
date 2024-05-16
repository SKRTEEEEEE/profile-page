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
  frameworks?: IFramework[];
}
export interface IFramework {
  nombre: string;
  preferencia: number;
  badge:string;
  afinidad: number;
  librerias?: ILibreria[];
}
export interface ILibreria{
  nombre: string,
  preferencia: number;
  afinidad: number;
  badge: string;
}