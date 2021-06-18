// /api/new-meetup

import { connectToMeetupCollections } from "./db-utils";

async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;

    const {meetupsCollection, client} = await connectToMeetupCollections();

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({message: 'New meetup added successfully.'})
  }
}

export default handler;
