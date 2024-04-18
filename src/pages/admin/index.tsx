import { AuthorizedContainer } from "@/components/authorize/Auth";
import { RaffleDisplay, useAdminGetDracoRaffles } from "@/hooks/draco";
import BaseLayout from "@/layout/base";
import { shortenString } from "@/util/number/number";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import { ReactElement, useState } from "react";
import toast from "react-hot-toast";
import YellowRect from "public/yellow-rect.svg";
import { MAIN_PADDING } from "@/styles/styles";
import ToggleComponent from "@/components/toggle";

const convertToDateTimeLocal = (timestamp: string) => {
  const date = new Date(timestamp);

  // Get the individual components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format the date string for input value
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
};

const EventInfo = ({
  event,
  router,
  setCurrentRaffleIdView,
  setView,
  setMaxEntrants,
  setTimestampEnd,
}: {
  event: RaffleDisplay;
  router: NextRouter;
  setCurrentRaffleIdView: (raffleId: string | null) => void;
  setView: (view: "create" | "edit") => void;
  setMaxEntrants: (maxEntrants: number) => void;
  setTimestampEnd: (timestampEnd: string) => void;
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
              Current Tickets: {event.currentEntrants}
            </p>
            <p>Max Entrants: {event.maxEntrants}</p>
            <div className="flex flex-col">
              <span
                className={`whitespace-nowrap ${
                  event.timestampEnds < Math.floor(Date.now() / 1000)
                    ? "text-red-500"
                    : "text-green-700"
                }`}
              >
                {event.timestampEnds < Math.floor(Date.now() / 1000)
                  ? "Ended On:"
                  : `Ends On:`}
              </span>
              <span className="mt-[1px]">{endDate}</span>
            </div>
          </div>
        </div>

        <div className="z-50 absolute -bottom-[20px] left-1/2 translate-x-[-50%]">
          <button
            className="wallet-adapter-button-trigger w-[86px] h-[32px] text-[#583C00] font-Lato700 leading-[19px] text-[12px] cursor-pointer"
            onClick={() => {
              setCurrentRaffleIdView(event.rafflePda);
              setMaxEntrants(event.maxEntrants);
              setTimestampEnd(convertToDateTimeLocal(endDate));
              setView("edit");
            }}
          >
            View Raffle
          </button>
        </div>
        <div className="main-historical-info-container-absolute w-full h-full z-10" />
      </div>
    </div>
  );
};

// The main component to display an array of events
const EventList = ({
  events,
  setCurrentRaffleIdView,
  setView,
  setMaxEntrants,
  setTimestampEnd,
}: {
  events: RaffleDisplay[];
  setCurrentRaffleIdView: (raffleId: string | null) => void;
  setView: (view: "create" | "edit") => void;
  setMaxEntrants: (maxEntrants: number) => void;
  setTimestampEnd: (timestampEnd: string) => void;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-[48px]">
      {events.map((event, index) => (
        <EventInfo
          key={index}
          event={event}
          router={router}
          setCurrentRaffleIdView={setCurrentRaffleIdView}
          setView={setView}
          setMaxEntrants={setMaxEntrants}
          setTimestampEnd={setTimestampEnd}
        />
      ))}
    </div>
  );
};

const Admin = () => {
  const wallet = useWallet();
  const { publicKey } = wallet;

  const [maxEntrants, setMaxEntrants] = useState<number>(0);
  const [timestampEnd, setTimestampEnd] = useState("");
  const handleDateChange = (event: any) => {
    setTimestampEnd(event.target.value);
  };

  const [view, setView] = useState<"create" | "edit">("create");
  const [currentRaffleIdView, setCurrentRaffleIdView] = useState<
    string | null
  >();

  const [isBurnAllowed, setIsBurnAllowed] = useState(false);

  const handleCreateAdminRaffle = async () => {
    if (maxEntrants < 3) {
      toast.error("Max entrants must be at least 3");
    }

    if (timestampEnd === "") {
      toast.error("Please select a date");
    }

    try {
      const {
        data: { data, error },
      } = await axios.post("/api/raffle/admin/create", {
        timestampEnds: new Date(timestampEnd).getTime() / 1000,
        maxEntrants,
        wallet: publicKey?.toBase58(),
      });

      if (error) {
        toast.error("Error creating raffle");
      }

      toast.success(`Raffle created, txn: ${data.txn}`);
    } catch (e) {
      toast.error("Error creating raffle");
    }
  };

  const handleEndRaffleAndPayout = async ({
    raffleId,
  }: {
    raffleId?: string | null;
  }) => {
    if (!raffleId) {
      toast.error("No raffle id, provided");
    }

    try {
      const {
        data: { data, error },
      } = await axios.post("/api/raffle/admin/payout", {
        wallet: publicKey?.toBase58(),
        raffleId,
        isBurn: isBurnAllowed,
      });

      if (error) {
        toast.error("Error creating raffle");
      }

      toast.success(`Raffle Ended, txn: ${data.txn}`);
    } catch (e) {
      toast.error("Error payout raffle");
    }
  };

  const handleEditAdminRaffle = async () => {
    if (maxEntrants < 3) {
      toast.error("Max entrants must be at least 3");
    }

    if (timestampEnd === "") {
      toast.error("Please select a date");
    }

    if (!currentRaffleIdView) {
      toast.error("No raffle id, provided");
    }

    try {
      const {
        data: { data, error },
      } = await axios.post("/api/raffle/admin/edit", {
        timestampEnds: new Date(timestampEnd).getTime() / 1000,
        maxEntrants,
        wallet: publicKey?.toBase58(),
        raffleId: currentRaffleIdView,
      });

      if (error) {
        toast.error("Error creating raffle");
      }

      toast.success(`Raffle edited successfully, txn: ${data.txn}`);
    } catch (e) {
      toast.error("Error creating raffle");
    }
  };

  const { data: allRaffles } = useAdminGetDracoRaffles({
    wallet: publicKey?.toBase58(),
  });

  return (
    <AuthorizedContainer>
      <div className="text-white-0" style={MAIN_PADDING}>
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold">
            {view === "create" ? "Create" : "Edit"} Raffle
          </h1>
          <div className="flex flex-col gap-[12px] py-2">
            <div>
              <h2>Ends At</h2>
              <input
                type="datetime-local"
                id="calendar"
                name="calendar"
                value={timestampEnd}
                onChange={handleDateChange}
                className="text-black-100 px-2 py-1"
              />
            </div>
            <div>
              <h2>Max Entrants</h2>
              <input
                type="number"
                value={maxEntrants}
                onChange={(e) => setMaxEntrants(Number(e.target.value))}
                className="text-black-100 px-2 py-1"
              />
            </div>
            {view === "create" ? (
              <button
                className="wallet-adapter-button-trigger w-[86px] h-[32px] text-[#583C00] font-Lato700 leading-[19px] text-[12px] cursor-pointer"
                onClick={handleCreateAdminRaffle}
              >
                Create
              </button>
            ) : (
              <>
                <ToggleComponent setIsBurnAllowed={setIsBurnAllowed} />
                <div className="flex flex-row gap-[24px]">
                  <button
                    className="wallet-adapter-button-trigger w-[106px] h-[32px] text-[#583C00] font-Lato700 leading-[19px] text-[12px] cursor-pointer"
                    onClick={handleEditAdminRaffle}
                  >
                    Confirm Edit
                  </button>
                  <button
                    className="wallet-adapter-button-trigger w-[106px] h-[32px] text-[#583C00] font-Lato700 leading-[19px] text-[12px] cursor-pointer"
                    onClick={() =>
                      handleEndRaffleAndPayout({
                        raffleId: currentRaffleIdView,
                      })
                    }
                  >
                    Confirm Payout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="border-solid border-black-100 border-2 my-[40px]" />
        {allRaffles && allRaffles.length ? (
          <EventList
            events={allRaffles}
            setCurrentRaffleIdView={setCurrentRaffleIdView}
            setView={setView}
            setMaxEntrants={setMaxEntrants}
            setTimestampEnd={setTimestampEnd}
          />
        ) : (
          <p>No Raffles</p>
        )}
      </div>
    </AuthorizedContainer>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Admin;
