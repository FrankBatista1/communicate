import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Communicate</title>
        <meta
          name="description"
          content="Connect with people worldwide, regardless of language barriers - Our social media platform brings people together!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <header className="flex w-[20%] justify-end border-r-2 border-solid border-black md:w-[12rem]">
          <NavBar />
        </header>
        <main className="grow">
          <div className="w-[100%] border-b-2 border-black">
            <h2 className="p-3">Profile View</h2>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
