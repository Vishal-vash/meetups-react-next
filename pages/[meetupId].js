import Head from "next/head";
import MeetupDetails from "../components/meetups/MeetupDetails";
import { connectToMeetupCollections } from "./api/db-utils";
import { ObjectId } from "mongodb";

const MeetUpDetailsPage = ({ selectedMeetUp }) => {
  return (
    <>
      <Head>
        <title>{selectedMeetUp.title}</title>
        <meta name="description" content={selectedMeetUp.description} />
      </Head>
      <MeetupDetails {...selectedMeetUp} />
    </>
  );
};

export async function getStaticPaths() {
  const { meetupsCollection, client } = await connectToMeetupCollections();
  const meetupsData = await meetupsCollection.find().toArray();
  const paths = meetupsData.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });
  client.close();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { meetupsCollection, client } = await connectToMeetupCollections();
  const selectedMeetUpData = await meetupsCollection.findOne({
    _id: ObjectId(context.params.meetupId),
  });
  const selectedMeetUp = {
    id: selectedMeetUpData._id.toString(),
    title: selectedMeetUpData.title,
    image: selectedMeetUpData.image,
    address: selectedMeetUpData.address,
    description: selectedMeetUpData.description,
  };
  console.log(selectedMeetUp);
  client.close();
  return {
    props: {
      selectedMeetUp,
    },
  };
}

export default MeetUpDetailsPage;
