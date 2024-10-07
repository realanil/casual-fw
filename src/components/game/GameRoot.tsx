import { loadAssets } from "@/utils/assetLoader";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ButtonPanel from "../buttonUI/ButtonPanel";
import PixiCanvas from "../core/PixiCanvas";

const GameRoot: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentBet, setCurrentBet] = useState(1);
  const [introScreen, setIntroScreen] = useState<boolean>(false);

  const handleSpin = () => {
    console.log(`Spinning with bet: $${currentBet}`);
    alert("working on this....");
    // Add your spinning logic here
  };

  const handleBetIncrease = () => {
    // setCurrentBet((prevBet) => prevBet + 1);
  };

  const handleBetDecrease = () => {
    // setCurrentBet((prevBet) => (prevBet > 1 ? prevBet - 1 : 1));
  };

  useEffect(() => {
    const p = async () => {
      await loadAssets().then(() => {
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
      });
    };
    p();
  }, []);

  if (loading) {
    return <Loading progress={progress} />;
  }
  return (
    <div id="gameCover">
      <div style={{ display: "flex", justifyContent: "center" }}>
        {introScreen && (
          <ButtonPanel
            onSpin={handleSpin}
            onBetIncrease={handleBetIncrease}
            onBetDecrease={handleBetDecrease}
            currentBet={currentBet}
          />
        )}
      </div>
      <PixiCanvas introScreen={introScreen} setIntroScreen={setIntroScreen} />
    </div>
  );
};
export default GameRoot;
