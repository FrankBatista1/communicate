import { type NextPage } from "next";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

const LoginHomePage: NextPage = () => {
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
      <section className="flex min-h-screen flex-col">
        <main className="flex grow">
          <article className="mt-[32px] flex w-[100%] flex-row justify-center gap-10 pb-[32px]">
            <div className="m-4 hidden max-w-[400px] grow flex-col justify-center lg:flex">
              <Image
                src="/assets/laptop-blackscreen.png"
                alt="laptop"
                width={500}
                height={500}
              />
            </div>
            <div className="m-10 flex max-w-[350px] flex-col justify-center">
              <SignIn path="/" routing="path" signUpUrl="/accounts/signup" />
            </div>
          </article>
        </main>
        <footer className="mb-[52px] flex justify-center gap-8 px-[16px]">
          <span>Home</span>
          <span>Terms</span>
          <span>Privacy</span>
        </footer>
      </section>
    </>
  );
};

export default LoginHomePage;
