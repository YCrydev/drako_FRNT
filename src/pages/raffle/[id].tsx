import BaseLayout from "@/layout/base";
import { MAIN_PADDING } from "@/styles/styles";
import { ReactElement, useEffect, useState } from "react";
import YellowRect from "public/yellow-rect.svg";
import DracoWeb from "public/drako web.svg";
import { useRouter } from "next/router";
import {
  RaffleDisplay,
  useGetOneDracoRaffle,
  useGetOneDracoRaffleTicketHolders,
} from "@/hooks/draco";
import { shortenString } from "@/util/number/number";
import axios from "axios";
import { BASE_URI_HM } from "@/env";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction } from "@solana/web3.js";
import base58 from "bs58";
import toast from "react-hot-toast";
import { TimeDisplayByDay } from "@/components/Time/ByDay";
import { TimeDisplayByMonth } from "@/components/Time/ByMonth";

const MainTicketPurchaseContainer = ({
  raffle,
  handleBuyTicket,
}: {
  raffle?: RaffleDisplay | null;
  handleBuyTicket: ({ ticketCount }: { ticketCount: number }) => void;
}) => {
  return (
    <div className="drako-image-container relative z-30">
      <div className="absolute top-[32px] left-[32px]">
        <h1 className="linear-gradient-yellow text-[26px] font-Lato700 leading-[31.2px]">
          {shortenString(raffle?.rafflePda || "", 3, 3)}
        </h1>
      </div>
      <div className="absolute top-[0] right-[0px] blur-first z-40 w-[220px] h-[90px] rounded-tr-[30px] rounded-bl-[30px]"></div>
      <div className="absolute top-[32px] right-[32px] z-50">
        <h1 className="linear-gradient-yellow text-[26px] font-Lato700 leading-[31.2px]">
          {"Provable fair"}
        </h1>
      </div>
      <div className="absolute z-50 left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] text-white-0 ">
        <div className="relative w-full h-full py-[30px] px-[50px]">
          <div className="relative z-50 flex flex-col items-center ">
            <h1 className="font-Lato400 text-[24px] leading-[28.8px] mb-[12px]">
              Lottery time
            </h1>
            {raffle?.timestampEnds ? (
              <TimeDisplayByDay timestamp={raffle?.timestampEnds} />
            ) : null}
          </div>
          <div className="main-blur" />
        </div>
      </div>
      <div className="absolute z-50 left-1/2 translate-x-[-50%] bottom-0 text-white-0 ">
        <div className="relative w-full h-full py-[40px] px-[120px]">
          <div className="relative z-50 flex flex-col items-center ">
            <h1 className="font-Lato700 text-[26px] leading-[31.2px] mb-[12px] linear-gradient-yellow">
              Buy Ticket
            </h1>
            <div className="flex flex-row gap-[24px]">
              <div
                onClick={() => handleBuyTicket({ ticketCount: 1 })}
                className="rounded-[8px] ticket-box w-[52px] h-[52px] flex items-center justify-center font-Lato700 text-[16px] leading-[19.2px] text-[#583C00] cursor-pointer"
              >
                1
              </div>
              <div
                onClick={() => handleBuyTicket({ ticketCount: 10 })}
                className="rounded-[8px] ticket-box w-[52px] h-[52px] flex items-center justify-center font-Lato700 text-[16px] leading-[19.2px] text-[#583C00] cursor-pointer"
              >
                10
              </div>
              <div
                onClick={() => handleBuyTicket({ ticketCount: 50 })}
                className="rounded-[8px] ticket-box w-[52px] h-[52px] flex items-center justify-center font-Lato700 text-[16px] leading-[19.2px] text-[#583C00] cursor-pointer"
              >
                50
              </div>
            </div>
          </div>
          <div className="buy-ticket-blur" />
        </div>
      </div>
    </div>
  );
};

const CurrentRaffleInfoContainer = () => {
  return (
    <div className="text-white-0 mt-[30px] flex flex-row md-max:flex-col md-max:items-center md-max:gap-[24px] justify-between">
      <div className=" flex flex-col gap-[12px] md-max:items-center">
        <h2 className="font-Lato400 text-[24px] leading-[28.8px]">
          Ticket Owned:
        </h2>
        <h2 className="linear-gradient-yellow font-Lato700 leading-[31px] text-[26px]">
          1,099,377
        </h2>
      </div>
      <div className="flex flex-col items-center gap-[12px]">
        <h2 className="font-Lato400 text-[26px] leading-[31px]">
          Ticket Price
        </h2>
        <h2 className="linear-gradient-yellow font-Lato700 leading-[43px] text-[36px]">
          {"1M"} $Drako
        </h2>
      </div>
      <div>
        <button className="wallet-adapter-button-trigger w-[166px] h-[52px] text-[#583C00] font-Lato700 leading-[19px] text-[16px] cursor-pointer">
          Buy $Drako here
        </button>
      </div>
    </div>
  );
};

const HistoricalStatsContainer = ({
  raffle,
}: {
  raffle?: RaffleDisplay | null;
}) => {
  const { data: ticketHolders } = useGetOneDracoRaffleTicketHolders({
    rafflePda: raffle?.rafflePda,
  });

  return (
    <div className="mt-[31px] flex flex-row xxxl-max:flex-col items-center justify-between gap-[31px]">
      <div className="main-historical-info-container w-[413px] h-[452px] relative z-50 scroller-blue">
        <div className="mt-[40px] w-full flex flex-col items-center gap-[12px] overflow-y-auto h-[400px] absolute z-50">
          {ticketHolders &&
            ticketHolders?.map((ticketHolder) => (
              <div
                key={ticketHolder.wallet}
                className="flex flex-row gap-[12px]"
              >
                <h2 className="font-Lato400 text-[14px] leading-[16.8px]">
                  {shortenString(ticketHolder.wallet, 10, 10)}
                </h2>
                <h2 className="linear-gradient-yellow font-Lato700 leading-[16.8px] text-[14px]">
                  {ticketHolder.ticketsPurchased}
                </h2>
              </div>
            ))}
        </div>
        <div className="z-50 absolute -top-[13px] left-1/2 translate-x-[-50%] ">
          <div className="relative w-full h-full">
            <span className="absolute top-[40%] translate-y-[-50%] left-1/2 translate-x-[-50%] text-[#583C00] text-[14px] font-Lato400 leading-[16px] whitespace-nowrap">
              Ticker Holders
            </span>

            <YellowRect />
          </div>
        </div>
        <div className="main-historical-info-container-absolute w-full h-full z-10" />
      </div>

      <div className="flex flex-col gap-[25px]">
        <div className="relative z-50 flex flex-col items-center text-white-0">
          <h1 className="font-Lato400 text-[24px] leading-[28.8px] mb-[12px]">
            Raffle ending in:
          </h1>
          {raffle?.timestampEnds ? (
            <TimeDisplayByMonth timestamp={raffle?.timestampEnds} />
          ) : null}
        </div>
        <DracoWeb />
      </div>
      <div className="main-historical-info-container w-[413px] h-[452px] relative z-50">
        <div className="z-50 absolute -top-[13px] left-1/2 translate-x-[-50%] ">
          <div className="relative w-full h-full">
            <span className="absolute top-[40%] translate-y-[-50%] left-1/2 translate-x-[-50%] text-[#583C00] text-[14px] font-Lato400 leading-[16px] whitespace-nowrap">
              Live Tickets Purchased
            </span>
            <YellowRect />
          </div>
        </div>
        <div className="main-historical-info-container-absolute w-full h-full z-10" />
      </div>
    </div>
  );
};

function Home() {
  const router = useRouter();
  const { id } = router.query;

  const wallet = useWallet();
  const { publicKey, signTransaction } = wallet;

  const { connection } = useConnection();

  const { data: raffle } = useGetOneDracoRaffle({ rafflePda: id as string });

  const handleBuyTicket = async ({ ticketCount }: { ticketCount: number }) => {
    if (!ticketCount) {
      toast.error("Please select a ticket count");
    }

    try {
      const {
        data: { error, data },
      } = await axios.post(
        `${BASE_URI_HM}idle-games`,
        {
          game: "draco-raffle",
          action: "buy-raffle-ticket",
          data: {
            wallet: publicKey?.toBase58(),
            amount: ticketCount,
            rafflePda: raffle?.rafflePda,
            raffleId: raffle?.raffleId,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );

      const serializedTransaction = data.txn;

      const deserializedVTTxn = VersionedTransaction.deserialize(
        base58.decode(serializedTransaction)
      );

      const signedTxn = await signTransaction!(deserializedVTTxn);

      const txn = await connection.sendRawTransaction(signedTxn.serialize());

      // const sim = await connection.simulateTransaction(signedTxn);

      // console.log(sim);

      if (txn) {
        toast.success(`Transaction sent successfully: ${txn}`);
      }
    } catch (err: any) {
      toast.error("Error buying ticket");
    }
  };

  return (
    <div style={MAIN_PADDING}>
      <MainTicketPurchaseContainer
        raffle={raffle}
        handleBuyTicket={handleBuyTicket}
      />
      <CurrentRaffleInfoContainer />
      <HistoricalStatsContainer raffle={raffle} />
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
