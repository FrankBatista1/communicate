import { type NextPage } from "next";
import { SignUp } from "@clerk/nextjs";

const SignUpPage: NextPage = () => {
  return <SignUp path="/signup" routing="path" signInUrl="/"/>;
};

export default SignUpPage;
