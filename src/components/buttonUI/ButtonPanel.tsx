import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import BetUI from "./BetUI";
import styles from "./ButtonPanel.module.css";

interface ButtonPanelProps {
  onSpin: () => void;
  // onBetIncrease: () => void;
  // onBetDecrease: () => void;
}
interface DataType {
  id: number;
  name: string;
}

interface btnInterface {
  bet: boolean;
  collectAmount: boolean;
  betInc: boolean;
  betDec: boolean;
}
interface colletInterface {
  collect: number;
  total: number;
}
const ButtonPanel: React.FC<ButtonPanelProps> = ({
  onSpin,
  // onBetIncrease,
  // onBetDecrease,
}) => {
  // The `state` arg is correctly typed as `RootState` already
  const dataAPi: any = useAppSelector((state) => state.bet.data);
  const responseCard: any = useAppSelector((state) => state.bet.responseCard);
  const betValue: any = useAppSelector((state) => state.bet.betValue);
  const [collectAmount, setCollectAmount] = useState<colletInterface>({
    collect: 0,
    total: 0,
  });
  const [wonHistory, setWonHistory] = useState<Array<any>>([]);
  useEffect(() => {
    // console.log("setBalance=>", dataAPi, dataAPi?.accountBalance.balance);
    setBalance(dataAPi?.accountBalance.balance);
  }, [dataAPi]);

  useEffect(() => {
    responseCard.round.status == "completed" &&
      setActiveBtn({ ...activeBtn, bet: true });
    if (responseCard.round.status == "started") {
      responseCard.round.events.forEach((event: any) => {
        event.c?.chosenChoice?.winFactor > 0 &&
          setActiveBtn({
            ...activeBtn,
            bet: false,
            collectAmount: true,
            betInc: false,
            betDec: false,
          });
        setWonHistory((prevSate) => [
          ...prevSate,
          event.c?.chosenChoice?.winFactor,
        ]);
        setCollectAmount({
          collect: event.c?.chosenChoice?.winFactor,
          total: event.c?.collectableWin,
        });
      });
    }
  }, [responseCard]);
  const dispatch = useAppDispatch();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [balance, setBalance] = useState<any>();
  const [activeBtn, setActiveBtn] = useState<btnInterface>({
    bet: true,
    collectAmount: false,
    betInc: true,
    betDec: true,
  });
  const onBet = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "bets/fetchBetsStart",
      payload: {
        seq: 2,
        sessionUuid: "23d298bd-9264-4147-974f-06f4f19a3438",
        bets: [
          {
            betAmount: betValue,
            customData: {
              suit: "clubs",
              value: 8,
            },
          },
        ],
        offerId: null,
        promotionId: null,
        autoplay: false,
      },
    });
    setActiveBtn({ ...activeBtn, bet: false, betInc: false, betDec: false });
    // console.log("count=>", count, dataAPi);
  };
  // const { data, loading, error } = state;
  const playSound = () => {
    // if (soundEnabled) {
    //   const audio = new Audio(sound);
    //   audio.play();
    // }
  };

  const toggleMusic = () => {
    if (musicPlaying) {
    } else {
    }
    setMusicPlaying(!musicPlaying);
  };
  const onCollectAmount = (e: any) => {
    e.preventDefault();
    dispatch({
      type: "bets/collectAmount",
      payload: {
        seq: 8,
        sessionUuid: "a7910d30-506d-4222-9f65-6a0acbc2f429",
        roundId: dataAPi.round.roundId,
        continueInstructions: { action: "collect" },
      },
    });
    // setActiveBtn({ ...activeBtn, bet: true, collectAmount: false });
    winPresentComplete(e);
  };

  const winPresentComplete = (e: any) => {
    e.preventDefault();
    dispatch({
      type: "bets/win_presentation_complete",
      payload: {
        seq: 9,
        sessionUuid: "a7910d30-506d-4222-9f65-6a0acbc2f429",
        roundId: dataAPi.round.roundId,
        continueInstructions: { action: "win_presentation_complete" },
      },
    });
    setActiveBtn({ ...activeBtn, bet: true, collectAmount: false });
  };
  const winAmountArr: Array<any> = [];
  if (wonHistory) {
    wonHistory.forEach((won: number, inx: number) => {
      won > 0 && winAmountArr.push(<li key={inx}>{won}</li>);
    });
  }
  return (
    <div className={styles.panel}>
      <div className={styles.buttonControls}>
        <button onClick={toggleMusic} className={styles.musicButton}>
          {musicPlaying ? "Mute Music" : "Play Music"}
        </button>
        <button
          onClick={() => alert("Info button clicked!")}
          className={styles.infoButton}
        >
          Info
        </button>
        <button
          onClick={() => alert("Home button clicked!")}
          className={styles.homeButton}
        >
          Home
        </button>
      </div>
      <div className={styles.balance}>
        <span className={styles.betText}>Demo Balance: {balance}</span>
        <ul className={styles.winUl}>{winAmountArr}</ul>
      </div>
      <div className={styles.spinControl}>
        <div className={styles.betControls}>
          <BetUI activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
          {activeBtn.bet && (
            <button
              onClick={(e) => {
                onBet(e);
                playSound();
              }}
              className={styles.spinButton}
            >
              Bet
            </button>
          )}
          {activeBtn.collectAmount && (
            <button
              onClick={(e) => {
                onCollectAmount(e);
              }}
              className={styles.spinButton}
            >
              Collect <span>{collectAmount.total}</span>
            </button>
          )}

          {/* {error && <div>Error: {error}</div>}
          {data && <div>Submitted Data: {JSON.stringify(data, null, 2)}</div>} */}
        </div>
      </div>
    </div>
  );
};

export default ButtonPanel;
