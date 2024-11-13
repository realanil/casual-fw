import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { betUpdate } from "@/lib/reducers/betReducer";
import React, { useEffect, useState } from "react";
import styles from "./ButtonPanel.module.css";

interface ButtonPanelProps {
  activeBtn: any;
  device?: string;
  setActiveBtn: (e: any) => any;
  scaleFactor: any;
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
const BetUI: React.FC<ButtonPanelProps> = ({
  activeBtn,
  setActiveBtn,
  device,
  scaleFactor,
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
  const handleBetIncrease = () => {
    setCurrentBetIndex((prevBet) => {
      const betInd = prevBet + 1;
      console.log(
        "handleBetIncrease=>",
        betInd,
        betArray[`${betInd + 1}`],
        betInd + 1
      );

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

  const handleBetDecrease = () => {
    setCurrentBetIndex((prevBet) => {
      const betInd = prevBet - 1;
      console.log(
        "handleBetDecrease=>",
        betInd,
        betArray[`${betInd - 1}`],
        betInd - 1
      );

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
  return device == "mobile" ? (
    <div className="Pane Pane--actions pane-rounded-corners">
      <div className="Pane__inner">
        <div className="ActionBetPanel" id="ActionPanel">
          <div className={styles.ActionBetPanel__container}>
            {/* <!-- BET AMOUNT --> */}
            <div id="BetAmoutItem">
              <span
                id="BetAmountValue"
                className="BalanceInfoPanel__value ActiveBetAmountValue"
                data-value=""
                data-charcount="5"
              >
                {betText}
              </span>
            </div>
          </div>
          <div className={styles.ActionBetPanel__container_progressbar}>
            {/* <!-- PROGRESSBAR --> */}
            <div className="BetAmountProgressbar">
              <span
                id="BetAmountIndicatorProgress"
                className={styles.BetAmountProgressbar__inner}
                style={{ width: "33.33%" }}
              ></span>
            </div>
          </div>
          <div className={styles.ActionBetPanel__container_cta}>
            <div className={styles.ActionBetPanel__button_container_inc_bet}>
              <button
                onClick={() => {
                  handleBetDecrease();
                }}
                disabled={!activeBtn.betDec}
                className={styles.button}
              >
                -
              </button>
            </div>
            <div className={styles.ActionBetPanel__button_container_dec_bet}>
              <button
                onClick={() => {
                  handleBetIncrease();
                }}
                disabled={!activeBtn.betInc}
                className={styles.button}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="bg-blue-0 p-0 text-white text-center rounded-lg transform transition-transform duration-300 mr-5"
      style={{
        width: "150px",
        height: "auto",
        // transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
      }}
    >
      <div className="mt-0">
        <button
          className="inline-block mr-1"
          onClick={handleBetDecrease}
          disabled={!activeBtn.betDec}
        >
          -
        </button>
        <span className="inline-block">{betText}</span>
        <button
          className="inline-block ml-1"
          onClick={handleBetIncrease}
          disabled={!activeBtn.betDec}
        >
          +
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

export default BetUI;
