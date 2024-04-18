import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
  new LedgerWalletAdapter(),
];

const WalletAdapterContext = ({ children }: PropsWithChildren) => {
  const endpoint = `https://global.rpc.hellomoon.io/${process.env.NEXT_PUBLIC_API_KEY}`;
  // const endpoint = `https://rpc-devnet.hellomoon.io/938342e7-af02-4304-95c1-b40b63733a59`;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletAdapterContext;
