import { type NextPage } from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "frankbatista1",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(!data) return <div>404</div>
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <header className="flex w-[20%] justify-end border-r-2 border-solid border-black md:w-[12rem]">
          <NavBar />
        </header>
        <main className="grow">
          <div className="w-[100%] border-b-2 border-black">
            <h2 className="p-3">{data.username}</h2>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;