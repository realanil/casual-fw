import ButtonPanel from "@/components/buttonUI/ButtonPanel";
import PixiCanvas from "@/components/core/PixiCanvas";
import { useAppDispatch } from "@/lib/hooks";
import { loadAssets } from "@/utils/assetLoader";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const GameRoot: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const [introScreen, setIntroScreen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleSpin = () => {
    // console.log(`Spinning with bet: $${currentBet}`);
    alert("working on this....");
    // Add your spinning logic here
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
    authenticate(); // Runngin on the Loading Time.
  }, []);

  const authenticate = () => {
    dispatch({
      type: "auth/authenticate",
      payload: {
        seq: 1,
        partner: "demo",
        gameId: 1111,
        gameVersion: "1.15.1",
        currency: "EUR",
        languageCode: "en",
        mode: 2,
        branding: "default",
        channel: 2,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        token: "123131",
      },
    });
  };
  if (loading) {
    return <Loading progress={progress} />;
  }
  return (
    <div id="gameCover">
      <div style={{ display: "flex", justifyContent: "center" }}>
        {introScreen && <ButtonPanel onSpin={handleSpin} />}
      </div>
      <PixiCanvas introScreen={introScreen} setIntroScreen={setIntroScreen} />
    </div>
  );
};
export default GameRoot;
