import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
  url: string;
}

const NavBar: React.FC<NavBarProps> = ({ url }) => {
  return (
    <div className="flex h-[100vh] w-[88px] justify-center">
      <div className="fixed flex h-[100%] flex-col justify-between p-3">
        <div className="flex flex-col items-center">
          <h1 aria-label="communicate">
            <Link className="py-2" href="/">
              <Image
                className="w-[100%]"
                src={"/assets/logowithoutletters.png"}
                alt="logo"
                width={40}
                height={40}
              />
            </Link>
          </h1>
          <Link className="py-2" href="/">
            Home
          </Link>
          <Link className="py-2" href="/">
            Chat
          </Link>
          <Link className="py-2" href="/">
            Profile
          </Link>
        </div>
        <div>
          <Image
            className="w-[100%] rounded-full"
            src={url}
            alt="profile-pic"
            width={40}
            height={40}
          />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
