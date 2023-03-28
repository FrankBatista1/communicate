import { type NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {

  return (
    <>
      <section className="flex min-h-screen flex-col">
        <main className="flex grow">
          <article className="mt-[32px] flex w-[100%] flex-row justify-center pb-[32px]">
            <div className="m-4 flex max-w-[350px] grow flex-col justify-center">
              <Image
                src="/assets/laptop-blackscreen.png"
                alt="laptop"
                width={500}
                height={500}
              />
            </div>
            <div className="flex max-w-[350px] grow flex-col justify-center">
              <div className="border-x-grey-800 mt-[10px] flex flex-col items-center justify-center border border-solid pb-[10px]">
                <div className="mt-[16px] self-center">
                  <Image
                    src="/assets/logo.png"
                    alt="communicate-logo"
                    width={150}
                    height={150}
                  />
                </div>
                <form className="mt-[24px] flex w-[70%] flex-col gap-[6px]">
                  <input className="border border-solid border-slate-300 bg-slate-100 pl-[4px] pb-[4px] pt-[4px] text-xs focus:outline-none"></input>
                  <input className="border border-solid border-slate-300 bg-slate-100 pl-[4px] pb-[4px] pt-[4px] text-xs focus:outline-none"></input>
                  <button className="mt-2 rounded-md bg-sky-400 p-[2px] text-sm font-semibold text-white opacity-[.7]">
                    Sign in
                  </button>
                  <div className="flex flex-row items-center gap-[12px]">
                    <div className="h-[1px] grow bg-gray-800 opacity-[.3]"></div>
                    <span>or</span>
                    <div className="h-[1px] grow bg-gray-800 opacity-[.3]"></div>
                  </div>
                  <span className="self-center font-semibold">
                    Log in with discord
                  </span>
                  <span className="self-center text-sm">Forgot password?</span>
                </form>
              </div>
              <div className="border-x-grey-800 mt-[10px] flex flex-col items-center justify-center border border-solid p-[10px]">
                <span>Dont have an acocunt? Sign up</span>
              </div>
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
