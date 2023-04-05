import { SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Head from "next/head";
import NavBar from "~/components/NavBar";

const Home: NextPage = () => {
  const { data } = api.posts.getAll.useQuery();

  const user = useUser();

  const url: string = user.user?.profileImageUrl as string;

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
      <div className="flex row">
        <header className="border-solid border-black border-r-2 w-[20%] md:w-[12rem] flex justify-end">
          <NavBar url={url} />
        </header>
        <main>
          <span>Home</span>
          <div>
            {data?.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </div>
          <SignOutButton />
        </main>
      </div>
      
    </>
  );
};

export default Home;
