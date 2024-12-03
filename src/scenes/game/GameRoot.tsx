import ButtonPanel from "@/components/buttonUI/ButtonPanel";
import PixiCanvas from "@/components/core/PixiCanvas";
import { useAppDispatch } from "@/lib/hooks";
import { loadAssets } from "@/utils/assetLoader";
import { useEffect, useState } from "react";
import Loading from "../Loading";
// const PixiCanvas = dynamic(() => import("@/components/core/PixiCanvas"), {
//   ssr: true,
// });

const GameRoot: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);

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

  // Update the scale factor when the window is resized
  /*useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Example scaling logic: Scale the boxes relative to the width of the window.
      const newScale = Math.max(0.1, Math.min(1, windowWidth / 1200)); // scale between 0.5 and 1.5 based on window width

      setScaleFactor(newScale);
    };

    // Listen for resize events
    window.addEventListener("resize", updateScale);

    // Set initial scale
    updateScale();

    // Cleanup on unmount
    return () => window.removeEventListener("resize", updateScale);
  }, []);*/

  if (loading) {
    return <Loading progress={progress} />;
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <main
        className="flex-grow"
        style={{ transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)` }}
      >
        <PixiCanvas introScreen={introScreen} setIntroScreen={setIntroScreen} />
      </main>
      {introScreen && <ButtonPanel onSpin={handleSpin} />}
    </div>
  );
};
export default GameRoot;
