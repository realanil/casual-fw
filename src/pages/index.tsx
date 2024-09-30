// pages/index.tsx
import PixiContainer from "@/components/PixiContainer";
import { Application } from "pixi.js";

import { useEffect, useState } from "react";
import Loading from "../components/Loading";

import ButtonPanel from "@/components/buttonUI/ButtonPanel";
// Create a new application
const app = new Application();
(async () => {
  globalThis.__PIXI_APP__ = app;
  if (typeof window !== "undefined") {
    await app.init({ background: "#ccc", resizeTo: window });
  }
})();
export { app };
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentBet, setCurrentBet] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          setLoading(false);
          return prev;
        }
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleSpin = () => {
    console.log(`Spinning with bet: $${currentBet}`);
    // Add your spinning logic here
  };

  const handleBetIncrease = () => {
    setCurrentBet((prevBet) => prevBet + 1);
  };

  const handleBetDecrease = () => {
    setCurrentBet((prevBet) => (prevBet > 1 ? prevBet - 1 : 1));
  };

  if (loading) {
    return <Loading progress={progress} />;
  }
  return (
    <div id="gameCover">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ButtonPanel
          onSpin={handleSpin}
          onBetIncrease={handleBetIncrease}
          onBetDecrease={handleBetDecrease}
          currentBet={currentBet}
        />
      </div>
      <PixiContainer />
    </div>
  );
};

export default Home;
