import { LucideIconNames } from "@/components/oth/dyn/dynamic-lucide";
import { IntlBase } from "./intl";
import { MongooseBase, MongooseTimestamps } from "@/core/infrastructure/mongoose/types";
import { Document } from "mongoose";
export enum TypeProject {
    Frontend = "frontend",
    Backend = "backend",
    Blockchain = "blockchain",
    Database = "database",
    DevOps = "devops",
    Design = "design",
    Other = "other"
  }
export type TechProject = {
    nameId: string;
    nameBadge: string;
    img: null|string;
    web: string;
    desc: IntlBase;
    type: TypeProject[];
    typeDesc: IntlBase;
    version: string|null;
}

type TimeProject = {
    title: IntlBase;
    date: string;
    desc: IntlBase;
    type: TypeProject[];
    techs: string[]; // Referencia a los IDs de TechProject
}

export type KeyProject = {
    icon: {
        iconName: LucideIconNames;
        className: string;
    };
    title: IntlBase;
    desc: IntlBase;
}

export type ProjectBase = {
    nameId: string;
    openSource: null|string;
    operative: null|string;
    ejemplo: boolean;
    image: null|string;
    icon: LucideIconNames;
    title: IntlBase;
    desc: IntlBase;
    lilDesc: IntlBase;
    time: TimeProject[];
    keys: KeyProject[];
    techs: TechProject[];
}
export type ProjectDocument = ProjectBase & MongooseTimestamps & Document;
export type Project = ProjectBase & MongooseBase;