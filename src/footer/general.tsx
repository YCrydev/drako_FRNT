import Link from "next/link";
import { useRouter } from "next/router";

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
      className={`font-PoppinsMedium whitespace-nowrap ${
        currentPathName === matchedPathName
          ? "text-[#FF5050]"
          : "text-[#FFFFFF]"
      }`}
      onClick={handleUnToggle}
    >
      {tabText}
    </Link>
  );
};

const General = () => {
  const router = useRouter();
  const locationPathName = router.asPath.toLowerCase();

  return (
    <div className="bg-[#3B313D]">
      <div className="flex flex-row items-center justify-between w-full   pt-[48px] px-[40px] pb-[97px] lg-max:flex-col lg-max:items-start">
        <div className="z-50 lg-max:mb-[50px]">
          <img
            onClick={() => router.push("/")}
            src={"/marm_logo_white.svg"}
            className="z-50 "
          />
        </div>
        <div className="flex flex-row items-center justify-end gap-[24px]">
          <TabWithLink
            currentPathName={locationPathName}
            matchedPathName="/"
            tabText="Home"
          />
          <TabWithLink
            currentPathName={locationPathName}
            matchedPathName="/ticket_booth"
            tabText="Ticket Booth"
          />
          <TabWithLink
            currentPathName={locationPathName}
            matchedPathName="/wheel"
            tabText="Wheel"
          />
        </div>

        <div className="lg:flex flex-row items-center z-50 hidden ">
          <img src="twitter.svg" />
          <img src="discord.svg" />
          <img src="magiceden.svg" className="mr-[10px]" />
        </div>
      </div>
      <div className="px-[40px] pb-[50px]">
        <div className="border-solid border-[1px] border-[#201A21] " />
        <div className="mt-[15px] text-[400] text-[#201A21]">
          2024 Marms. All rights reverved
        </div>
      </div>
    </div>
  );
};

export default General;
