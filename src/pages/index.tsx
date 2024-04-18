import { RaffleDisplay, useGetDracoRaffles } from "@/hooks/draco";
import BaseLayout from "@/layout/base";
import { MAIN_PADDING } from "@/styles/styles";
import { ReactElement, useEffect, useState } from "react";
import YellowRect from "public/yellow-rect.svg";
import { shortenString } from "@/util/number/number";
import { NextRouter, useRouter } from "next/router";

const EventInfo = ({
  event,
  router,
}: {
  event: RaffleDisplay;
  router: NextRouter;
}) => {
  const endDate = new Date(event.timestampEnds * 1000).toLocaleString();

  return (
    <div>
      <div className="main-historical-info-container w-[213px] h-[252px] relative z-50">
        <div className="z-50 absolute -top-[13px] left-1/2 translate-x-[-50%] ">
          <div className="relative w-full h-full">
            <span className="absolute top-[40%] translate-y-[-50%] left-1/2 translate-x-[-50%] text-[#583C00] text-[14px] font-Lato400 leading-[16px] whitespace-nowrap">
              id: {shortenString(event.rafflePda, 3, 3)}
            </span>
            <YellowRect />
          </div>
        </div>

        <div className="z-50 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <div className="relative w-full h-full text-white-0 flex flex-col items-start gap-[12px]">
            <p className="whitespace-nowrap font-Lato400">
              Current Entrants: {event.currentEntrants}
            </p>
            <p>Max Entrants: {event.maxEntrants}</p>
            <div className="flex flex-col">
              <span className="whitespace-nowrap ">Ends On:</span>
              <span className="mt-[1px]">{endDate}</span>
            </div>
          </div>
        </div>

        <div className="z-50 absolute -bottom-[20px] left-1/2 translate-x-[-50%]">
          <button
            className="wallet-adapter-button-trigger w-[86px] h-[32px] text-[#583C00] font-Lato700 leading-[19px] text-[12px] cursor-pointer"
            onClick={() => router.push(`/raffle/${event.rafflePda}`)}
          >
            enter raffle
          </button>
        </div>
        <div className="main-historical-info-container-absolute w-full h-full z-10" />
      </div>
    </div>
  );
};

// The main component to display an array of events
const EventList = ({ events }: { events: RaffleDisplay[] }) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-[48px]">
      {events.map((event, index) => (
        <EventInfo key={index} event={event} router={router} />
      ))}
    </div>
  );
};

function Home() {
  const { data: allDracoRaffles } = useGetDracoRaffles();

  return (
    <div style={MAIN_PADDING}>
      {allDracoRaffles ? (
        <EventList events={allDracoRaffles} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
