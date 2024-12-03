import { usePixi } from "@/context/PixiContext";
import React from "react";

interface ButtonPanelProps {
  activeBtn: any;
  onBet: any;
  playSound: any;
  onCollectAmount: any;
  collectAmount: any;
  isPortrait?: boolean;
}
const BetSection: React.FC<ButtonPanelProps> = ({
  activeBtn,
  onBet,
  playSound,
  onCollectAmount,
  collectAmount,
  isPortrait,
}) => {
  const { device } = usePixi();
  return isPortrait ? (
    <div className="w-full sm:w-[100px] mb-0 p-0">
      <div className="bg-green-0 text-white text-center rounded-sm transform transition-transform duration-300">
        {activeBtn.bet && (
          <button
            className="px-6 py-0 bg-green-600 text-white rounded-lg text-lg font-semibold transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={(e) => {
              onBet(e);
              playSound();
            }}
          >
            Place Bet
          </button>
        )}
        {!activeBtn.bet && !activeBtn.collectAmount && (
          <button className="px-6 py-0 bg-green-0 text-white rounded-lg text-lg font-semibold transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
            &nbsp;
          </button>
        )}
        {activeBtn.collectAmount && (
          <button
            className="px-6 py-0 bg-green-600 text-white rounded-lg text-lg font-semibold transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={(e) => {
              onCollectAmount(e);
              playSound();
            }}
          >
            Collect <span>{collectAmount.total}</span>
          </button>
        )}
      </div>
    </div>
  ) : (
    <div
      className={`bg-green-00 text-white text-center rounded-lg transform transition-transform duration-300`}
      style={
        {
          // width: "100px",
          // height: "50px",
          // marginLeft: "150px",
          // transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
        }
      }
    >
      <div className="absolute -m-[125px]">
        {activeBtn.bet && (
          <button
            onClick={(e) => {
              onBet(e);
              playSound();
            }}
            className={`p-5 bg-green-600 text-white rounded-lg text-lg font-semibold transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            Place Bet
          </button>
        )}
        {activeBtn.collectAmount && (
          <button
            onClick={(e) => {
              onCollectAmount(e);
              playSound();
            }}
            className={`p-5 bg-green-600 text-white rounded-lg text-lg font-semibold transition hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            Collect <span>{collectAmount.total}</span>
          </button>
        )}
        {/* {activeBtn.bet && (
          <button
            className={`bg-green-${
              activeBtn.bet || activeBtn.collectAmount ? "700" : "0"
            } text-white text-center rounded-lg transform transition-transform duration-300 hover:bg-green-900 p-1`}
            onClick={(e) => {
              onBet(e);
              playSound();
            }}
            style={{
              width: "100px",
            }}
          >
            Bet
          </button>
        )} */}
        {/* {activeBtn.collectAmount && (
          <button
            className={`bg-green-${
              activeBtn.bet || activeBtn.collectAmount ? "700" : "0"
            } text-white text-center rounded-lg transform transition-transform duration-300 hover:bg-green-900 p-1`}
            onClick={(e) => {
              onCollectAmount(e);
              playSound();
            }}
            style={{
              width: "100px",
            }}
          >
            Collect <span>{collectAmount.total}</span>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default BetSection;
