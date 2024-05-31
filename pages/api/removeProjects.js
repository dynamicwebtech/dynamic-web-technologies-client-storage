import { MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5gb",
    },
  },
};

async function connectToDatabase(uri) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

export default async function handler(req, res) {
  let projectsClient = null;
  let clientsClient = null;

  try {
    if (req.method === "DELETE") {
      const { projectName, domainName } = req.body;

      if (!projectName || !domainName) {
        return res
          .status(400)
          .json({ error: "Project name and domain name are required" });
      }

      projectsClient = await connectToDatabase(
        process.env.PROJECTS_DB_CONNECTION_URI
      );

      const projectsCollection = projectsClient
        .db(process.env.PROJECTS_DB_NAME)
        .collection(process.env.PROJECTS_DB_COLLECTION);

      const result = await projectsCollection.deleteOne({
        projectName,
        domainName,
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Connect to the clients database
      // clientsClient = await connectToDatabase(
      //   process.env.CLIENTS_DB_CONNECTION_URI
      // );
      // const clientsCollection = clientsClient
      //   .db(process.env.CLIENTS_DB_NAME)
      //   .collection(process.env.CLIENTS_DB_COLLECTION);

      // Update clients that have the deleted project linked
      // await clientsCollection.updateMany(
      //   { projectName, domainName },
      //   { $set: { project: null } }
      // );

      res.status(200).json({ message: "Project deleted successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error removing Project(s) from database: ", error);
    res.status(500).json({ error: "Failed to remove Project(s)" });
  } finally {
    if (client) {
      await client.close();
      console.log("CLOSED connection to Projects DB");
    }
  }
}
