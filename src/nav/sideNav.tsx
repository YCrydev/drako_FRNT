import { useRouter } from "next/router";
import Link from "next/link";
import Home from "public/home.svg";
import Twitter from "public/twitter.svg";
import Discord from "public/discord.svg";

interface TabWithLinkProps {
  currentPathName: string;
  matchedPathName: string;
  tabText: string;
  // if link should open in a new tab
  target?: string;
  handleUnToggle?: () => void;
}

const TabWithLink = ({
  currentPathName,
  matchedPathName,
  tabText,
  target,
  handleUnToggle,
}: TabWithLinkProps) => {
  return (
    <Link
      href={`${matchedPathName}`}
      passHref
      target={target}
      className={`font-PoppinsBold whitespace-nowrap ${
        currentPathName === matchedPathName ? "animated-text" : "text-white-0"
      }`}
      onClick={handleUnToggle}
    >
      {tabText}
    </Link>
  );
};

export default function SideNav() {
  const router = useRouter();
  const locationPathName = router.asPath.toLowerCase();

  return (
    <div className="sidenav h-full w-[87px] fixed z-50 top-0 left-0 overflow-x-hidden py-[27px]">
      <div className="flex flex-col items-center">
        <img
          onClick={() => router.push("/")}
          src={"/drako_logo.svg"}
          className=""
        />
        <div className="flex flex-col gap-[18px] mt-[26px]">
          <a onClick={() => router.push("/")}>
            <Home className="cursor-pointer" />
          </a>
          <a>
            <Twitter className="cursor-pointer" />
          </a>
          <a>
            <Discord className="cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
}
