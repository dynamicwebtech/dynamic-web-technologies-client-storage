import { MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5gb",
    },
  },
};

async function connectToDatabase() {
  const client = new MongoClient(process.env.CLIENTS_DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client; // Return the MongoClient instance directly
}

export default async function handler(req, res) {
  let client = null;

  try {
    if (req.method === "GET") {
      client = await connectToDatabase();

      const collection = client
        .db(process.env.CLIENTS_DB_NAME)
        .collection(process.env.CLIENTS_DB_COLLECTION);

      const clients = await collection.find({}).toArray();

      res.status(200).json({ clients });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error retrieving Clients from database: ", error);
    res.status(500).json({ error: "Failed to retrieve Clients" });
  } finally {
    if (client) {
      await client.close();
      console.log("CLOSED connection to Clients DB");
    }
  }
}
