import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/music-app";
const options = {};

let client: MongoClient | null = null;

export async function connectToDatabase() {

  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient };

    if (!globalWithMongo._mongoClient) {
      console.log("Development: Creating new MongoDB client...");
      globalWithMongo._mongoClient = new MongoClient(uri, options);
      await globalWithMongo._mongoClient.connect(); 
      console.log("Development: MongoDB client connected.");
    } else {
      console.log("Development: Reusing existing MongoDB client...");
    }

    client = globalWithMongo._mongoClient; 
  } else {
    if (!client) {
      console.log("Production: Creating new MongoDB client...");
      client = new MongoClient(uri, options);
      await client.connect(); 
      console.log("Production: MongoDB client connected.");
    }
  }

  return client; 
}

export async function getDb() {
  const client = await connectToDatabase(); 
  return client.db(process.env.DB_NAME || "music-app"); 
}
