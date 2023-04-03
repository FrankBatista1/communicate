import { type NextPage } from "next";
import { SignUp } from "@clerk/nextjs";

const SignUpPage: NextPage = () => {
  return (
    <>
    <SignUp
      path="/accounts/signup"
      routing="path"
      signInUrl="/"
      redirectUrl="/home"
      />
    </>
  );
};

export default SignUpPage;
