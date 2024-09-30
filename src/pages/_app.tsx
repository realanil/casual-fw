import "@/styles/globals.css";
import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
// import { AppProps } from "next/app";

import PixiProvider from "../context/PixiContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <PixiProvider>
      <Component {...pageProps} />
    </PixiProvider>
  );
};

export default MyApp;
