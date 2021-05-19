// /api/new-meetup

import { connectToMeetupCollections } from "./db-utils";

async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    // const client = await MongoClient.connect("mongodb://vishal:nokian72@cluster0-shard-00-00.tywjg.mongodb.net:27017/meetups-db?ssl=true&replicaSet=atlas-or7lh3-shard-0&authSource=admin&retryWrites=true&w=majority");
    // console.log("Connected Successfully.")
    // const db = client.db();

    // const meetupsCollection = db.collection('meetups');

    const {meetupsCollection, client} = await connectToMeetupCollections();

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({message: 'New meetup added successfully.'})
  }
}

export default handler;
