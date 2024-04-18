import "@/styles/globals.css";
import "@/styles/hamburger.css";
import "@/styles/sidebar.css";
import "@/styles/main.css";
import "@/styles/box-shadow.css";
import "@/styles/nav.css";
import "@/styles/sideNav.css";
import "@/styles/wallet-adapter-btn.css";
import "@/styles/text.css";
import "@/styles/blur.css";
import "@/styles/container.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";


export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            backgroundColor: "#334155",
            color: "#f9fafb",
            minWidth: "250px",
            wordBreak: "break-all",
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
