import Head from "next/head";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  async function onAddMeetupHandler(meetUpData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }
  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Add new intersting place for the meetup here"
        />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
