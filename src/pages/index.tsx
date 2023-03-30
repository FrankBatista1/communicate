import { type NextPage } from "next";
import Image from "next/image";
import { SignIn, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {


  return (
    <>
      <section className="flex min-h-screen flex-col">
        <main className="flex grow">
          <article className="mt-[32px] flex w-[100%] flex-row justify-center pb-[32px] gap-10">
            <div className="hidden m-4 lg:flex max-w-[400px] grow flex-col justify-center">
              <Image
                src="/assets/laptop-blackscreen.png"
                alt="laptop"
                width={500}
                height={500}
              />
            </div>
            <div className="m-10 flex max-w-[350px] flex-col justify-center">
               <SignIn appearance={
                {
                  elements: {
                    logoBox: "self-center w-[150px] h-[150px]",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    card: "shadow-none border border-solid border-slate-300",
                    formFieldInput: "border border-solid border-slate-300 bg-slate-100",
                    socialButtonsBlockButton: "border border-solid border-slate-300",
                    footer: "self-center",
                  },
                  variables: {
                    colorPrimary: "#b50d3a",
                  },
                  layout: {
                    logoImageUrl: "/assets/logo.png",
                    socialButtonsPlacement: "bottom",
                    
                  }

               }} path="/" routing="path" signUpUrl="/sign-up" />
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

export default Home;
