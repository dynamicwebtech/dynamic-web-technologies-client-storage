/**
 *
 *  This is the getProjects API
 *
 */

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "5gb",
  },
};

import multer from "multer";
import { MongoClient, ObjectId } from "mongodb";

async function connectToDatabase() {
  const client = new MongoClient(process.env.PROJECTS_DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

export default async function handler(req, res) {}
