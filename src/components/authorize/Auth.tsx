import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PropsWithChildren, ReactElement, useEffect, useState } from "react";
import base58 from "bs58";
import axios from "axios";
import { API_KEY } from "@/env";
import { DrakoConnectButton } from "@/solana/walletConnectButton";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const ConnectYourWalletComponent = ({
  ConnectButton,
}: {
  ConnectButton: JSX.Element;
}) => {
  return (
    <div className="mb-4 w-96 text-hmio-black-100 flex items-center flex-col">
      <h2 className="flex flex-col mb-10 text-center font-bold text-[26px]">
        <span>Connect your wallet to</span>
        <span>start playing</span>
      </h2>
      <div className="multi-wallet-button-auth">{ConnectButton}</div>
    </div>
  );
};

const SignInButton = ({ signInWithJwt }: { signInWithJwt: any }) => (
  <button
    className="justify-center bg-white-0 text-[#9F9F9F] font-PoppinsBold rounded-[45px] w-[173px] h-[48px] text-[16px]"
    onClick={() => {
      signInWithJwt();
    }}
  >
    Sign in with Wallet
  </button>
);

export interface AuthorizedContainerProps {}

export const AuthorizedContainer = ({
  children,
}: PropsWithChildren<AuthorizedContainerProps>): ReactElement => {
  const { connection } = useConnection();
  const { publicKey, signMessage, signTransaction } = useWallet();
  const [trigger, setTrigger] = useState(false);
  const [hasJwt, setHasJwt] = useState(false);

  const buildAuthTx = async (
    timestamp_in_sec: string
  ): Promise<Transaction> => {
    const tx = new Transaction();
    const recentBlockhash = await connection.getRecentBlockhash();
    tx.recentBlockhash = recentBlockhash.blockhash;
    tx.feePayer = publicKey!;

    tx.add(
      new TransactionInstruction({
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
        keys: [],
        data: Buffer.from(timestamp_in_sec, "utf8"),
      })
    );
    return tx;
  };

  const handleOwnershipLedger = async () => {
    try {
      const authTx = buildAuthTx(Math.floor(Date.now() / 1000).toString());
      const signedTx = await signTransaction!(await authTx);

      if (signedTx) {
        const { data: error } = await axios.post(
          "/api/auth/cjt",
          {
            wallet: publicKey?.toBase58(),
            signature: base58.encode(signedTx.serialize()),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        if (!error.error) {
          setTrigger((prev) => !prev);
          setHasJwt(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyJwt = async () => {
    try {
      const { data: res } = await axios.post(
        "/api/auth/verify_jwt",
        {
          wallet: publicKey?.toBase58(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (res.error) {
        handleOwnershipLedger();
      } else {
        setHasJwt(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (!publicKey || !signMessage) {
      return;
    }

    verifyJwt();
  }, [publicKey]);

  if (publicKey && hasJwt) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      {!publicKey ? (
        <ConnectYourWalletComponent ConnectButton={<DrakoConnectButton />} />
      ) : (
        <ConnectYourWalletComponent
          ConnectButton={<SignInButton signInWithJwt={handleOwnershipLedger} />}
        />
      )}
    </div>
  );
};
