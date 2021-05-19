import Head from "next/head";
import MeetUpList from "../components/meetups/MeetupList";
import { connectToMeetupCollections } from "./api/db-utils";

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>All Meetups</title>
        <meta name="description" content="All meetups and interesting places data here" />
      </Head>
      <MeetUpList meetups={meetups} />
    </>
  );
};

export async function getStaticProps() {
  //fetch Meetups data from server via API
  const { meetupsCollection, client } = await connectToMeetupCollections();
  const meetupsData = await meetupsCollection.find().toArray();
  const meetups = meetupsData.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
    };
  });
  client.close();
  return {
    props: {
      meetups,
    },
    revalidate: 1
  };
}

export default HomePage;
