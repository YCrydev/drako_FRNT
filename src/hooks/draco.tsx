import useSWR from "swr";
import axios from "axios";
import { BASE_URI_HM } from "@/env";

export type RaffleDisplay = {
  currentEntrants: number;
  timestampEnds: number;
  maxEntrants: number;
  rafflePda: string;
  raffleId?: string;
};
export const UseGetDracoRaffles = "UseGetDracoRaffles";
export const useGetDracoRaffles = () => {
  const { data, error, mutate } = useSWR(
    [UseGetDracoRaffles],
    async () => {
      try {
        const {
          data: { error, data },
        } = await axios.post(
          `${BASE_URI_HM}idle-games`,
          {
            game: "draco-raffle",
            action: "get-all-raffles",
            data: {},
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );

        if (error) {
          return null;
        }

        return data as RaffleDisplay[];
      } catch (err) {
        return null;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  };
};

export const UseAdminGetDracoRaffles = "UseAdminGetDracoRaffles";
export const useAdminGetDracoRaffles = ({ wallet }: { wallet?: string }) => {
  const { data, error, mutate } = useSWR(
    wallet ? [UseGetDracoRaffles, wallet] : null,
    async () => {
      try {
        const {
          data: { error, data },
        } = await axios.post(`/api/raffle/admin/get-all`, {
          wallet,
        });

        if (error) {
          return null;
        }

        return data as RaffleDisplay[];
      } catch (err) {
        return null;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  };
};

export const UseGetOneDracoRaffle = "UseGetOneDracoRaffle";
export const useGetOneDracoRaffle = ({ rafflePda }: { rafflePda: string }) => {
  const { data, error, mutate } = useSWR(
    rafflePda ? [UseGetOneDracoRaffle, rafflePda] : null,
    async () => {
      try {
        const {
          data: { error, data },
        } = await axios.post(
          `${BASE_URI_HM}idle-games`,
          {
            game: "draco-raffle",
            action: "get-one-raffle",
            data: {
              rafflePda,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );

        if (error) {
          return null;
        }

        return data as RaffleDisplay;
      } catch (err) {
        return null;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  };
};

export const UseGetOneDracoRaffleTicketHolders =
  "UseGetOneDracoRaffleTicketHolders";
export const useGetOneDracoRaffleTicketHolders = ({
  rafflePda,
}: {
  rafflePda?: string;
}) => {
  const { data, error, mutate } = useSWR(
    rafflePda ? [UseGetOneDracoRaffleTicketHolders, rafflePda] : null,
    async () => {
      try {
        const {
          data: { error, data },
        } = await axios.post(
          `${BASE_URI_HM}idle-games`,
          {
            game: "draco-raffle",
            action: "get-one-raffle-ticket-holders",
            data: {
              rafflePda,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );

        if (error) {
          return null;
        }

        return data.raffleTicketHolders as {
          wallet: string;
          ticketsPurchased: number;
        }[];
      } catch (err) {
        return null;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 10_000,
    }
  );

  return {
    data,
    error,
    mutate,
    isLoading: !data && !error,
  };
};
