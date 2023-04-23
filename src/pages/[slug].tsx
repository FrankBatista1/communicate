import {
  type GetStaticProps,
  type NextPage,
} from "next";
import Head from "next/head";
import NavBar from "~/components/NavBar";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;
  return (
    <>
      <Head>
        <title>{data.username}</title>
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

import { prisma } from "~/server/db";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, currentUserId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("No slug");

  const username = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;
