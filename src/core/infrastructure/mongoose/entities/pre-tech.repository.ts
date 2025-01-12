import { MongoosePreTechPattern } from "../patterns/pre-tech.pattern";
import { PreTechRepository } from "@/core/application/interfaces/entities/pre-tech";
import { PreTechModel } from "../schemas/pre-tech.schema";
import { MongooseBase, MongooseDocument } from "../types";

export class MongoosePreTechRepository<TBase> extends MongoosePreTechPattern<TBase> implements PreTechRepository<TBase> {
  private mdUrl = 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/slugs.md';
  private jsonUrl = 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/_data/simple-icons.json';
  constructor() {
    super(PreTechModel);
  }
  async readByQuery(query: string): Promise<(TBase & MongooseBase)[]> {
    await this.connect()
    const opt = {
      filter: {
      $or: [
        { nameId: { $regex: query, $options: 'i' } },
        { nameBadge: { $regex: query, $options: 'i' } }
      ]
    },
    projections: {},
    options: { limit: 50 }
  }
    // const res = await this.Model.find({
    //     $or: [
    //         { nameId: { $regex: query, $options: 'i' } },
    //         { nameBadge: { $regex: query, $options: 'i' } }
    //     ]
    // }, {}, {limit: 50})
    // return res.map((doc: any) => {
    //     console.log("doc in pretech pattern: ", doc)
    //     return this.documentToPrimary(doc)}
    // )
    return await this.read(opt)
  }
  async updatePreTech(): Promise<void> {
    this.connect();

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
      // 4. For the first time only ❗-> Populate PreTech collection
      // await this.populatePreTech(combinedData);

      // 4. Get existing nameIds from the database
      const existingNameIds = new Set(await this.Model.distinct('nameId'));

      // 5. Filter out only the new technologies
      const newTechs = combinedData.filter(item => !existingNameIds.has(item.nameId));

      // 6. Insert only the new technologies
      if (newTechs.length > 0) {
        await this.populate(newTechs as TBase[]);
        console.log(`Inserted ${newTechs.length} new technologies`);
      } else {
        console.log('No new technologies to insert');
      }


    } catch (error) {
      console.error("Error fetching or parsing PreTech data:", error);
      throw error;
    }
  }

  // not used
  async readByName(name: string)
    : Promise<TBase & MongooseBase> {
    // return await this.readRepo.read({
    //     $or: [
    //         {nameId: { $regex: name, $options: 'i' }},
    //         {nameBadge: { $regex: name, $options: 'i' }}
    //     ]
    // })

    await this.connect()
    const filter = {
      "nameId": name
    }
    return await this.read({filter})
    // const res = await this.Model.find({
    //   $or: [
    //     { nameId: { $regex: name, $options: 'i' } },
    //     { nameBadge: { $regex: name, $options: 'i' } }
    //   ]
    // }).limit(50).lean()
    console.log("res at readByName repository: ", res)
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