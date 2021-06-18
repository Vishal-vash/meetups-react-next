import { MongoClient } from "mongodb";

export const connectToMeetupCollections = async () => {
  const client = await MongoClient.connect(
    `mongodb://${process.env.username}:${process.env.password}@cluster0-shard-00-00.tywjg.mongodb.net:27017/meetups-db?ssl=true&replicaSet=atlas-or7lh3-shard-0&authSource=admin&retryWrites=true&w=majority`
  );
  console.log("Connected Successfully.");
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  return { meetupsCollection, client };
};
