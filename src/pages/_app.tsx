import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import LoginHomePage from "./loginHomePage";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider
      appearance={{
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
        },
      }}
      {...pageProps}
    >
      <Head>
        <title>Communicate</title>
        <meta
          name="description"
          content="Connect with people worldwide, regardless of language barriers - Our social media platform brings people together!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedOut>
        <LoginHomePage />
      </SignedOut>
      <SignedIn>
        <Toaster />
        <Component {...pageProps} />
      </SignedIn>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
