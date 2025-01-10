import { Model } from "mongoose";
import { MongooseBaseRepository } from "../implementations/base.repository";
import { MongooseReadRepository } from "../implementations/read.repository";
import { MongooseBase, MongooseDocument } from "../types";
import { PreTechRepository } from "@/core/application/interfaces/entities/pre-tech";

export abstract class MongoosePreTechPattern<
    TBase
> extends MongooseBaseRepository<TBase>
    implements PreTechRepository<TBase> {
    private readRepo: MongooseReadRepository<TBase>;
    private mdUrl = 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/slugs.md';
    private jsonUrl = 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/_data/simple-icons.json';
    constructor(Model: Model<any, {}, {}, {}, any, any>) {
        super(Model);
        this.readRepo = new MongooseReadRepository(this.Model);
    }
    async read(
        filter?: any,
        projection?: any,
        options?: any
    ): Promise<any> {
        return await this.readRepo.read(filter, projection, options);
    }
    async readByName(name: string)
        : Promise<TBase & MongooseBase> {
        // return await this.readRepo.read({
        //     $or: [
        //         {nameId: { $regex: name, $options: 'i' }},
        //         {nameBadge: { $regex: name, $options: 'i' }}
        //     ]
        // })
        await this.connect()
        const res = await this.Model.find({
            $or: [
                { nameId: { $regex: name, $options: 'i' } },
                { nameBadge: { $regex: name, $options: 'i' } }
            ]
        }).limit(10).lean()
        return this.documentToPrimary(res as TBase & MongooseDocument)
    }
    async updatePreTech(): Promise<void> {

        try {
            // 1. Fetch data from md file
            const mdResponse = await fetch(this.mdUrl);
            if (!mdResponse.ok) {
                throw new Error(`HTTP error! status: ${mdResponse.status}`);
            }
            const mdContent = await mdResponse.text();
            const preTechData = this.parseMdContent(mdContent);

            // 2. Fetch data from json file
            const jsonResponse = await fetch(this.jsonUrl);
            if (!jsonResponse.ok) {
                throw new Error(`HTTP error! status: ${jsonResponse.status}`);
            }
            const jsonData = await jsonResponse.json();

            // 3. Process and combine data
            // const combinedData = this.combineData(preTechData, jsonData);
            const combinedData = preTechData.map(mdItem => {
                const jsonItem = jsonData.find((item: any) => item.title === mdItem.nameId);
                if (jsonItem) {
                    return {
                        nameId: mdItem.nameId,
                        nameBadge: mdItem.nameBadge,
                        color: jsonItem.hex,
                        web: jsonItem.source
                    };
                }
                return null;
            }).filter(item => item !== null);
            // console.log('Combined PreTech data:', combinedData);
            //Get existing nameIds from the database
            const existingNameIds = new Set(await this.Model.distinct('nameId'));

            // 4. Filter out only the new technologies
            const newTechs = combinedData.filter(item => !existingNameIds.has(item.nameId));

            // 5. Insert only the new technologies
            if (newTechs.length > 0) {
                await this.Model.insertMany(newTechs);
                console.log(`Inserted ${newTechs.length} new technologies`);
            } else {
                console.log('No new technologies to insert');
            }
            // For the first time only ❗
            // await this.populatePreTech(combinedData);


        } catch (error) {
            console.error("Error fetching or parsing PreTech data:", error);
            throw error;
        }
    }

    //Only first time
    // private async populatePreTech(data: any) {
    //     this.connect();
    //     const batchSize = 1000;
    //     for (let i = 0; i < data.length; i += batchSize) {
    //         const batch = data.slice(i, i + batchSize);
    //         try {
    //             await this.Model.insertMany(batch, { ordered: false });
    //         } catch (error) {
    //             console.error('Error inserting batch:', error);
    //         }
    //     }
    //     console.log('PreTech data population completed');
    // }

    private parseMdContent(content: string): Array<{ nameId: string, nameBadge: string }> {
        const lines = content.split('\n');
        const data = [];
        let tableStarted = false;

        for (const line of lines) {
            if (line.startsWith('| Brand name | Brand slug |')) {
                tableStarted = true;
                continue;
            }
            if (tableStarted && line.startsWith('| :--- | :--- |')) {
                continue;
            }
            if (tableStarted && line.startsWith('|') && line.includes('|')) {
                const [, brandName, brandSlug] = line.split('|').map(item => item.trim());
                if (brandName && brandSlug) {
                    data.push({
                        nameId: brandName.replace(/`/g, ''),
                        nameBadge: brandSlug.replace(/`/g, '')
                    });
                }
            }
        }

        return data;
    }

}