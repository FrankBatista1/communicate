import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api, type RouterOutputs } from "~/utils/api";
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
        className="mx-4 rounded-full"
        alt={"Your profile image"}
        width={40}
        height={40}
      />
      <input
        placeholder="What's on your mind?"
        className="grow bg-transparent outline-none"
      ></input>
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className="flex border-b-2 border-solid border-black p-4">
      <div>
        <Image
          className="mx-4 rounded-full"
          src={author.profileImageUrl}
          alt={`Profile image of ${author.username}`}
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="font-semibold">{`@${author.username}`}</span>
          <span>{` · 1 hour ago`}</span>
        </div>
        <p key={post.id}>{post.content}</p>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { data } = api.posts.getAll.useQuery();

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
            <h2 className="p-3">Home</h2>
          </div>
          <div className="border-b-2 border-black p-4">
            <CreatePostWizdar />
          </div>
          <div>
            {data?.map(({ post, author }) => (
              <PostView key={post.id} post={post} author={author} />
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
