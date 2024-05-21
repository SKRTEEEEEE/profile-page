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

export interface ILenguajeForm {
  name: string;
  afinidad: number;
  badge: string;
  preferencia: number;
  color: string;
  experiencia: number;
}
export interface IFrameworkForm {
  name: string;
  afinidad: number;
  badge: string;
  preferencia: number;
  color: string;
  experiencia: number;
  lenguajeTo: string;
}
export interface ILibreriaForm {
  name: string;
  afinidad: number;
  badge: string;
  preferencia: number;
  color: string;
  experiencia: number;
  lenguajeTo: string;
  frameworkTo: string;
}

export interface IJsonTech {
  name: String; afinidad: number; value: string; experiencia: number; valueexp: string; usogithub?: number;
}