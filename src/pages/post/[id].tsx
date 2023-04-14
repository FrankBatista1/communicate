import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";

const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <div className="flex">
        <header className="flex w-[20%] justify-end border-r-2 border-solid border-black md:w-[12rem]">
          <NavBar />
        </header>
        <main className="grow">
          <div className="w-[100%] border-b-2 border-black">
            <h2 className="p-3">Single Post page</h2>
          </div>
        </main>
      </div>
    </>
  );
};

export default SinglePostPage;
