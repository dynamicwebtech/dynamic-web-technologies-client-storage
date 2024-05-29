import { MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5gb",
    },
  },
};

async function connectToDatabase() {
  const client = new MongoClient(process.env.PROJECTS_DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

export default async function handler(req, res) {
  let client = null;

  try {
    if (req.method === "DELETE") {
      const { projectName, domainName } = req.body;

      if (!projectName || !domainName) {
        return res
          .status(400)
          .json({ error: "Project name and domain name are required." });
      }

      client = await connectToDatabase();
      const collection = client
        .db(process.env.PROJECTS_DB_NAME)
        .collection(process.env.PROJECTS_DB_COLLECTION);

      const project = await collection.findOne({ projectName, domainName });

      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }

      const result = await collection.deleteOne({
        projectNameID: project.projectNameID,
      });

      if (result.deletedCount === 0) {
        return res.status(500).json({ error: "Failed to delete project." });
      }

      res.status(200).json({ message: "Project deleted successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error removing Project from database: ", error);
    res.status(500).json({ error: "Failed to remove Project" });
  } finally {
    if (client) {
      await client.close();
      console.log("CLOSED connection to Projects DB");
    }
  }
}
