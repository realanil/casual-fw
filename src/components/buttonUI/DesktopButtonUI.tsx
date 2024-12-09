import BalanceSection from "./BalanceSection";
import BetControl from "./BetControl";
import BetSection from "./BetSection";
import HamburgerSection from "./HamburgerSection";

interface DesktopButtonUIProps {
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

const DesktopButtonUI: React.FC<DesktopButtonUIProps> = ({
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
  // Dynamic styles for scaling
  const containerStyle = {
    height: "auto",
    width: "auto",
    transformOrigin: "bottom",
    transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`,
  };
  return (
    <div
      className="fixed flex bottom-0 justify-center w-full bg-gray-900 gap-6 mt-0 p-5 z-10"
      style={containerStyle}
    >
      <div className="mb-1">
        {/* Box Section at the Top */}
        <div className="flex justify-center gap-0 mt-4">
          {/* Box 1 */}
          <BalanceSection win={win} />
          {/* Box 2 */}
          <BetControl
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            scaleFactor={scaleFactor}
            soundAction={soundAction}
          />
          <BetSection
            activeBtn={activeBtn}
            onBet={onBet}
            playSound={clickSound}
            onCollectAmount={onCollectAmount}
            collectAmount={collectAmount}
          />
          {/* Box 3 */}
          <HamburgerSection
            soundAction={soundAction}
            musicPlaying={musicPlaying}
            soundPlaying={soundPlaying}
            openModal={openModal}
          />
        </div>
      </div>
      {/* Box Section at the Bottom */}
    </div>
  );
};

export default DesktopButtonUI;
