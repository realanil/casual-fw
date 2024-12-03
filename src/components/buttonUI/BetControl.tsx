import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { betUpdate } from "@/lib/reducers/betReducer";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

interface ButtonPanelProps {
  activeBtn: any;
  device?: string;
  setActiveBtn: (e: any) => any;
  scaleFactor: any;
  isPortrait?: boolean;
  soundAction: (
    e: any,
    soundId: string,
    soundSprite: string,
    loop: boolean
  ) => any;
}

interface DataType {
  id: number;
  name: string;
}

interface btnInterface {
  bet: boolean;
  collectAmount: boolean;
}
interface betArrayInterface {
  [key: string]: string;
}
const BetControl: React.FC<ButtonPanelProps> = ({
  activeBtn,
  setActiveBtn,
  device,
  scaleFactor,
  isPortrait,
  soundAction,
}) => {
  const authResponse: any = useAppSelector((state) => state.auth.data);
  const indexBet = authResponse.betLevels.indexOf(authResponse.defaultBetLevel);
  const [currentBetIndex, setCurrentBetIndex] = useState<number>(indexBet);
  const [betArray, setBetArray] = useState<betArrayInterface>(
    authResponse.betLevels
  );
  const bet: number = Number(betArray[`${currentBetIndex}`]) | 0;
  const [betText, setBetText] = useState<string>((bet / 100).toFixed(2));
  const dispatch = useAppDispatch();
  const handleBetIncrease = (e: any) => {
    setCurrentBetIndex((prevBet) => {
      const betInd = prevBet + 1;
      // console.log(
      //   "handleBetIncrease=>",
      //   betInd,
      //   betArray[`${betInd + 1}`],
      //   betInd + 1
      // );
      soundAction(e, "betIncerase", "th_sx_bet_increase", false);
      betArray[`${betInd + 1}`]
        ? setActiveBtn((prevState: any) => ({
            ...prevState,
            betInc: true,
            betDec: true,
          }))
        : setActiveBtn((prevState: any) => ({
            ...prevState,
            betInc: false,
          }));
      return betArray[`${betInd}`] ? prevBet + 1 : prevBet;
    });
  };

  const handleBetDecrease = (e: any) => {
    setCurrentBetIndex((prevBet) => {
      const betInd = prevBet - 1;
      // console.log(
      //   "handleBetDecrease=>",
      //   betInd,
      //   betArray[`${betInd - 1}`],
      //   betInd - 1
      // );
      soundAction(e, "betDecrease", "th_sx_bet_decrease", false);
      betArray[`${betInd - 1}`]
        ? setActiveBtn((prevState: any) => ({
            ...prevState,
            betInc: true,
            betDec: true,
          }))
        : setActiveBtn((prevState: any) => ({
            ...prevState,
            betDec: false,
          }));

      return betArray[`${betInd}`] ? prevBet - 1 : prevBet;
    });
  };
  useEffect(() => {
    const bet: number = Number(betArray[`${currentBetIndex}`]) | 0;
    dispatch(betUpdate({ bet }), bet);
    setBetText((bet / 100).toFixed(2));
  }, [currentBetIndex]);
  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log("Enter key was pressed!");
    // switch (event.key) {
    //   case "Enter":
    //     console.log("Enter key was pressed!");
    //     break;
    //   case "Escape":
    //     console.log("Escape key was pressed!");
    //     break;
    //   default:
    //     console.log(`You pressed: ${event.key}`);
    //     break;
    // }
  };
  // console.log("isPortrait=>", isPortrait, activeBtn);
  return isPortrait ? (
    <div className="w-full sm:w-[150px] mb-0 p-0.5">
      <div className="bg-gray-500 p-0 text-white text-center rounded-sm transform transition-transform duration-300">
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handleBetDecrease}
            className="flex items-center justify-center p-2 bg-blue-800 text-white rounded-full hover:bg-blue-600 transition"
            disabled={!activeBtn.betDec}
          >
            <FontAwesomeIcon icon={faMinus} className="text-xs" />
          </button>
          <span className="text-x text-white-800">{betText}</span>
          <button
            onClick={handleBetIncrease}
            className="flex items-center justify-center p-2 bg-blue-800 text-white rounded-full hover:bg-blue-600 transition"
            disabled={!activeBtn.betInc}
          >
            <FontAwesomeIcon icon={faPlus} className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="bg-blue-0 text-white text-center rounded-lg transform transition-transform duration-300 mr-5"
      style={{
        // width: "150px",
        height: "auto",
        // transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
      }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={handleBetDecrease}
          className="flex items-center justify-center p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
          disabled={!activeBtn.betDec}
        >
          <FontAwesomeIcon icon={faMinus} className="text-x" />
        </button>
        <span className="text-xl text-white-800">{betText}</span>
        <button
          onClick={handleBetIncrease}
          className="flex items-center justify-center p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
          disabled={!activeBtn.betInc}
        >
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
      </div>
    </div>
    // <div
    //   className="bg-yellow-0 text-white text-center rounded-lg transform transition-transform duration-300 mb-0"
    //   style={{
    //     width: "550",
    //     height: "50px",
    //     transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
    //   }}
    // >
    //   <div className="ml-10">
    //     <button
    //       className="block"
    //       onKeyDown={handleKeyDown}
    //       disabled={!activeBtn.betDec}
    //     >
    //       -
    //     </button>
    //     <button className="block">{betText}</button>
    //     <button
    //       className="block"
    //       onClick={() => {
    //         handleBetIncrease();
    //       }}
    //       disabled={!activeBtn.betInc}
    //     >
    //       +
    //     </button>
    //   </div>
    // </div>
  );
};

export default BetControl;
