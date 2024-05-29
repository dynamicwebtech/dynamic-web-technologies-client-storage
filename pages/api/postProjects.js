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
    if (req.method === "POST") {
      client = await connectToDatabase();
      const collection = client
        .db(process.env.PROJECTS_DB_NAME)
        .collection(process.env.PROJECTS_DB_COLLECTION);

      const {
        projectID,
        projectName,
        projectNameID,
        domainName,
        creationDate,
        packageType,
        isHosting,
        hostingPrice,
        renewalDay,
        websiteType,
        additionalAddOns,
        isCustomPrice,
        customPrice,
        projectGrandTotal,
        projectCommentsNotes,
      } = req.body;

      // Check for existing project with the same projectName and domainName
      const existingProject = await collection.findOne({
        projectName,
        domainName,
      });
      if (existingProject) {
        res
          .status(409)
          .json({
            error: "Project with the same name and domain already exists.",
          });
        return;
      }

      const commentsArray = Array.isArray(projectCommentsNotes)
        ? projectCommentsNotes
        : [projectCommentsNotes];

      await collection.insertOne({
        projectID,
        projectName,
        projectNameID,
        domainName,
        creationDate,
        packageType,
        isHosting,
        hostingPrice,
        renewalDay,
        websiteType,
        additionalAddOns,
        additionalPages: req.body.additionalPages,
        isCustomPrice,
        customPrice,
        projectGrandTotal,
        projectCommentsNotes: commentsArray,
      });

      res.status(200).json({ message: "Project submitted successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error saving Project to database: ", error);
    res.status(500).json({ error: "Failed to save Project." });
  } finally {
    if (client) {
      await client.close();
      console.log("CLOSED connection to Projects DB");
    }
  }
}
