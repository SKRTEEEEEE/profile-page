import { projectsToInsert } from "@/components/ceo/projects-hardcdd";
import { MongoosePreTechPattern } from "../patterns/pre-tech.pattern";
import { ProjectModel } from "../schemas/project.schema";

export class MongooseProjectRepository<TBase> extends MongoosePreTechPattern<TBase>{
    constructor() {
        super(ProjectModel);
    }
    async testPopulate() {
        await this.connect();
        const data = await this.populate(projectsToInsert as TBase[]);
        console.log(data);
    }
}