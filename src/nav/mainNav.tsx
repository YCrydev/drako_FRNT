import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DrakoConnectButton } from "@/solana/walletConnectButton";
import { MAIN_PADDING } from "@/styles/styles";

export default function MainNav() {
  const router = useRouter();
  const locationPathName = router.asPath.toLowerCase();

  return (
    <div
      className=" flex flex-row items-center justify-between "
      style={MAIN_PADDING}
    >
      <img
        onClick={() => router.push("/")}
        src={"/Drako Lottery.svg"}
        className="
          lg:w-[223px]
          lg:h-[43px]

          md:w-[200px]
          md:h-[36px]

          sm:w-[180px]
          sm:h-[30px]

          w-[150px]
          h-[25px]
        "
      />
      <div className="">
        <DrakoConnectButton />
      </div>
    </div>
  );
}
