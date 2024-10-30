import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Application } from "pixi.js";
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }
// import { AppProps } from "next/app";

import store from "@/lib/store";
import { isMobileDevice } from "@/utils/deviceDetectionj";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import PixiProvider from "../context/PixiContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const myGlobal: { [key: string]: any } = globalThis;
  const appRef = useRef<Application | any>(null);
  const app = new Application();
  const [device, setDevice] = useState<string>("desktop");
  useEffect(() => {
    appInit();
    setDevice(isMobileDevice());
  }, [device]);
  const appInit = async () => {
    myGlobal.__PIXI_APP__ = app;
    if (typeof window !== "undefined") {
      // appRef.current = new PIXI.Application({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      //   backgroundColor: 0x1099bb,
      // });

      appRef.current = await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        resizeTo: window,
        backgroundColor: "#232b53",
        hello: true,
      });
      // console.log("appRef.current 984=>", appRef.current);
    }
  };
  // console.log("pageProps=>", pageProps);
  return (
    <Provider store={store}>
      <PixiProvider app={app} appRef={appRef} device={device}>
        <Component {...app} />
      </PixiProvider>
    </Provider>
  );
};

export default MyApp;
