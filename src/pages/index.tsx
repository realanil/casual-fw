// pages/index.tsx

import GameRoot from "@/components/game/GameRoot";
import { Application } from "pixi.js";
const app = new Application();
const myGlobal: { [key: string]: any } = globalThis;
// Create a new application
(async () => {
  myGlobal.__PIXI_APP__ = app;
  if (typeof window !== "undefined") {
    await app.init({ background: "#ccc", resizeTo: window });
  }
})();
export { app };
const Home: React.FC = () => {
  // Assets.load("/background/bg.webp");
  return <GameRoot />;
};
export default Home;
