import MainNav from "@/nav/mainNav";
import SideNav from "@/nav/sideNav";
import WalletAdapterContext from "@/solana/walletAdapterContext";

interface LayoutProps {
  children: any;
  footer?: boolean;
  tempSpacer?: boolean;
  dataBar?: boolean;
}

require("@solana/wallet-adapter-react-ui/styles.css");

/**
 *
 * Solana Wallet Adapter Context Wraps Our Layout
 *
 * Nav
 * Main
 * @returns
 */
const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <WalletAdapterContext>
        <SideNav />
        <MainNav />
        <main>{children}</main>
      </WalletAdapterContext>
    </>
  );
};

export default BaseLayout;
