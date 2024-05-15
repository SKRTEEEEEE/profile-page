export interface TechLenguajeItem {
    title: string;
    icon: React.ReactElement;
    version: string;
    desc: string;
  }

export type Afinidad = 'maxima' | 'alta' | 'moderada' | 'baja' | 'minima';
export interface ILenguaje extends Document {
  name: string;
  afinidad: Afinidad;
  web: string;
}