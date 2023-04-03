import { SignOutButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data } = api.posts.getAll.useQuery();

  return (
    <>
      <p>an appXD</p>
      <div>
        {data?.map((post) => (
          <div key={post.id}>{post.content}</div>
        ))}
      </div>
      <SignOutButton />
    </>
  );
};

export default Home;
