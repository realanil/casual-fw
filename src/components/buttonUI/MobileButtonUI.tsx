import React from "react";
import BalanceSection from "./BalanceSection";
import BetControl from "./BetControl";
import BetSection from "./BetSection";
import HamburgerSection from "./HamburgerSection";

interface MobileButtonUIProps {
  activeBtn: string;
  onBet: () => void;
  clickSound: () => void;
  onCollectAmount: () => void;
  collectAmount: number;
  isPortrait: boolean;
  win: string;
  setActiveBtn: (btn: string) => void;
  scaleFactor: number;
  soundAction: () => void;
  musicPlaying: boolean;
  soundPlaying: boolean;
  openModal: () => void;
}
const MobileButtonUI: React.FC<MobileButtonUIProps> = ({
  activeBtn,
  onBet,
  clickSound,
  onCollectAmount,
  collectAmount,
  isPortrait,
  win,
  setActiveBtn,
  scaleFactor,
  soundAction,
  musicPlaying,
  soundPlaying,
  openModal,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-black z-10"
      style={{
        width: "auto",
        height: "auto",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-center gap-1 sm:gap-6 mt-1 sm:mt-20">
        {/* <!-- Bet Button Box --> */}
        <BetSection
          activeBtn={activeBtn}
          onBet={onBet}
          playSound={clickSound}
          onCollectAmount={onCollectAmount}
          collectAmount={collectAmount}
          isPortrait={isPortrait}
        />
        {/* <!-- Demo Balance Box --> */}
        <BalanceSection win={win} isPortrait={isPortrait} />
        {/* <!-- Bet Adjuster Box --> */}
        <BetControl
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          scaleFactor={scaleFactor}
          isPortrait={isPortrait}
          soundAction={soundAction}
        />

        {/* <!-- Links Box --> */}
        <HamburgerSection
          soundAction={soundAction}
          musicPlaying={musicPlaying}
          soundPlaying={soundPlaying}
          openModal={openModal}
          isPortrait={isPortrait}
        />
      </div>
    </div>
  );
};

export default MobileButtonUI;
