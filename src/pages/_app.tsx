import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Application } from "pixi.js";
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
// import { AppProps } from "next/app";

import PixiProvider from "../context/PixiContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const myGlobal: { [key: string]: any } = globalThis;
  const app = new Application();
  (async () => {
    myGlobal.__PIXI_APP__ = app;
    if (typeof window !== "undefined") {
      await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        resizeTo: window,
        backgroundColor: 0x2c3e50,
        hello: true,
      });
    }
  })();
  console.log("pageProps=>", pageProps);
  return (
    <PixiProvider app={app}>
      <Component {...app} />
    </PixiProvider>
  );
};

export default MyApp;
