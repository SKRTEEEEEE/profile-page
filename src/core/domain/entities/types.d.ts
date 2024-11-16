import mongoose from "mongoose"

export type MongooseBase = {
    id: string
    createdAt: string
    updatedAt: string
  }
  export type DocumentBase = {
    _id: mongoose.Types.ObjectId;
     createdAt: Date;
     updatedAt: Date;
 }