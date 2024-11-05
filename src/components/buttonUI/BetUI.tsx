import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { betUpdate } from "@/lib/reducers/betReducer";
import React, { useEffect, useState } from "react";
import styles from "./ButtonPanel.module.css";

interface ButtonPanelProps {
  activeBtn: any;
  device?: string;
  setActiveBtn: (e: any) => any;
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
    <div className={styles.betControls}>
      <button
        onClick={() => {
          handleBetDecrease();
        }}
        disabled={!activeBtn.betDec}
        className={styles.button}
      >
        -
      </button>
      <span className={styles.betText}> {betText}</span>
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
  );
};

export default BetUI;
