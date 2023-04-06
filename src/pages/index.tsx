import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import Image from "next/image";

const CreatePostWizdar = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex">
      <Image
        src={user.profileImageUrl}
        className="rounded-full mx-4"
        alt={"Profile image"}
        width={40}
        height={40}
      />
      <input
        placeholder="What's on your mind?"
        className="bg-transparent grow outline-none"
      ></input>
    </div>
  );
};

const Home: NextPage = () => {
  const { data } = api.posts.getAll.useQuery();

  const { user } = useUser();

  const imageUrl: string = user?.profileImageUrl as string;

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
          <NavBar url={imageUrl} />
        </header>
        <main className="grow">
          <div className="w-[100%] border-b-2 border-black">
            <h2 className="p-3">Home</h2>
          </div>
          <div className="border-b-2 border-black p-4">
            <CreatePostWizdar />
          </div>
          <div>
            {data?.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}
          </div>
        </main>
        <div className="w-[30%] border-l-2 border-black">
          <h2>Chat</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
