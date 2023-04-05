import Image from "next/image";
import Link from "next/link";

interface NavBarProps {
  url: string;
}

const NavBar: React.FC<NavBarProps> = ( { url } ) => {
  return (
    <div className="h-[100vh] w-[88px] flex justify-center">
      <div className="fixed flex-col flex justify-between h-[100%] p-3">
        <div className="flex flex-col items-center">
          <Link className="py-2" href="/"><Image className="w-[100%]"src={"/assets/logowithoutletters.png"} alt="logo" width={40} height={40}/></Link>
          <Link className="py-2" href="/">Home</Link>
          <Link className="py-2" href="/">Chat</Link>
          <Link className="py-2" href="/">Profile</Link>
        </div>
        <div>
         <Image className="rounded-full w-[100%]" src={url} alt="profile-pic" width={40} height={40}/> 
        </div>
      </div>
    </div>
  );
};

export default NavBar;
