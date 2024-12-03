// pages/index.tsx
import Head from "next/head";

import GameRoot from "@/scenes/game/GameRoot";
const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Hi-Lo Casual Game</title>
        <meta name="description" content="Welcome to the Hi-Lo Casual Game" />
      </Head>
      <GameRoot />
    </div>
  );
};
export default Home;
