import { type NextPage } from "next";
import { SignUp } from "@clerk/nextjs";

const SignUpPage: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen" >
      <SignUp path="/signup" routing="path" signInUrl="/" />
    </div>
  );
};

export default SignUpPage;
