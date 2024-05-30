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
    if (req.method === "DELETE") {
      res.status(200).json({ message: "Client deleted successfully!" });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error removing Client(s) from database: ", error);
    res.status(500).json({ error: "Failed to remove Client(s)" });
  } finally {
    if (client) {
      await client.close();
      console.log("CLOSED connection to Clients DB");
    }
  }
}
