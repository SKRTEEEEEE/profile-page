import mongoose, { Connection } from 'mongoose';

interface DBConnection {
    isConnected: boolean;
    //connection?: Connection;-es necesario?-   Para almacenar la conexión una vez establecida
  }

export const connectToDB = async ():Promise<Connection> => {
  const connection: DBConnection = {isConnected: false};


  try {
    if (connection.isConnected) return mongoose.connection;
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Connected!");
    return db.connection;
    
  } catch (error: any) {
    throw new Error(error);
  }
};