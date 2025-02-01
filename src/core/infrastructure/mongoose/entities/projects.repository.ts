import { projectsToInsert } from "@/components/ceo/portafolio/projects-hardcdd";
import { MongoosePreTechPattern } from "../patterns/pre-tech.pattern";
import { MongooseBase } from "../types";
import { Model } from "mongoose";

export class MongooseProjectRepository<TBase, TOptions extends Partial<Record<keyof TBase & MongooseBase, (value: any) => any>> = {}> extends MongoosePreTechPattern<TBase, TOptions>{
    constructor(Model: Model<any, {}, {}, {}, any, any>,parseOpt?: TOptions) {
        super(Model, parseOpt);
    }
    async testPopulate() {
        await this.connect();
        const data = await this.populate(projectsToInsert as TBase[]);
        console.log(data);
    }
    // async readLean() {
    //     await this.connect()
    //     return await this.Model.find({ejemplo:true}).lean()
    // }
}