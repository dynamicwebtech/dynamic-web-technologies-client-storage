// Import necessary modules
import { MongoClient, ObjectId } from "mongodb";

// Define a function to connect to the MongoDB database
async function connectToDatabase() {
  const client = new MongoClient(process.env.PROJECTS_DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

// Handler function in api/editProject.js
export default async function handler(req, res) {
  let client = null;

  try {
    if (req.method === "PUT") {
      client = await connectToDatabase();

      const collection = client
        .db(process.env.PROJECTS_DB_NAME)
        .collection(process.env.PROJECTS_DB_COLLECTION);

      const { _id, ...updateFields } = req.body;

      if (!ObjectId.isValid(_id)) {
        return res.status(400).json({ error: "Invalid Project ID." });
      }

      const result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateFields }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Project not found." });
      }

      res.status(200).json({ message: "Project updated successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error updating Project in database: ", error);
    res.status(500).json({ error: "Failed to update Project." });
  } finally {
    if (client) {
      await client.close();
      console.log("CLOSED connection to Projects DB");
    }
  }
}
