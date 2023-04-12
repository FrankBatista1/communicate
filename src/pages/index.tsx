import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api, type RouterOutputs } from "~/utils/api";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingSpinner } from "~/components/loading";
import { useState } from "react";
import { toast } from "react-hot-toast";

dayjs.extend(relativeTime);

const CreatePostWizdar = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  if (!user) return null;

  const { mutate, isLoading: isPoasting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (err) => {
      const errorMessage = err.data?.zodError?.fieldErrors?.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else toast.error("Failed to post, please try again later");
    },
  });

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
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            mutate({ content: input });
            setInput("");
          }
        }}
      ></input>
      <div className="flex h-10 w-20 items-center justify-center">
        {isPoasting ? (
          <LoadingSpinner size={30} />
        ) : (
          <button
            disabled={isPoasting || !input}
            className="rounded-full bg-slate-800 px-4 py-1 text-white disabled:bg-slate-600"
            onClick={() => {
              mutate({ content: input });
              setInput("");
            }}
          >
            Post
          </button>
        )}
      </div>
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
          <span>{` · ${dayjs(post.createdAt).fromNow()}`}</span>
        </div>
        <p key={post.id}>{post.content}</p>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center pt-[50%]">
        <LoadingSpinner size={60} />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div>
      {data?.map(({ post, author }) => (
        <PostView key={post.id} post={post} author={author} />
      ))}
    </div>
  );
};
const Home: NextPage = () => {
  // Start fetching posts as soon as the page loads
  api.posts.getAll.useQuery();

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
          <Feed />
        </main>
        <div className="w-[30%] border-l-2 border-black">
          <h2>Chat</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
