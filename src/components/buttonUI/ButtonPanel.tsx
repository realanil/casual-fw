import { usePixi } from "@/context/PixiContext";
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
  total: string;
}
interface PrevCardInterface {
  card: number;
  suit: string;
}
const ButtonPanel: React.FC<ButtonPanelProps> = ({
  onSpin,
  // onBetIncrease,
  // onBetDecrease,
}) => {
  // The `state` arg is correctly typed as `RootState` already
  const dataAPi: any = useAppSelector((state) => state.bet.data);
  const responseCard: any = useAppSelector((state) => state.bet.responseCard);
  const collectApi: any = useAppSelector((state) => state.bet.collect);
  const betValue: any = useAppSelector((state) => state.bet.betValue);
  const [collectAmount, setCollectAmount] = useState<colletInterface>({
    collect: 0,
    total: "",
  });
  const { device } = usePixi();
  const [win, setWin] = useState<string>("");
  // const [wonHistory, setWonHistory] = useState<Array<any>>([]);
  const [prevCards, setPrevCards] = useState<PrevCardInterface>({
    card: 8,
    suit: "clubs",
  });
  useEffect(() => {
    // console.log("setBalance=>", dataAPi, dataAPi?.accountBalance.balance);
    setBalance(Number(dataAPi?.accountBalance.balance).toFixed(2));
  }, [dataAPi]);

  useEffect(() => {
    if (responseCard.round.status == "completed") {
      setActiveBtn({ ...activeBtn, bet: true, collectAmount: false });
      responseCard?.round?.events.forEach((event: any) => {
        setPrevCards({ card: event.c?.card?.value, suit: event.c?.card?.suit });
      });
    }

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

        setCollectAmount({
          collect: event.c?.chosenChoice?.winFactor,
          total: Number(event.c?.collectableWin).toFixed(2),
        });
        setPrevCards({ card: event.c?.card?.value, suit: event.c?.card?.suit });
      });
    }
  }, [responseCard]);

  useEffect(() => {
    console.log("collectApi=>", collectApi);
    if (collectApi.round.status == "wfwpc") {
      collectApi.round.events.forEach((event: any) => {
        // setWonHistory((prevSate) => [
        //   // ...prevSate,
        //   event.wa,
        // ]);
        setWin(Number(event.wa).toFixed(2));
      });
    }
  }, [collectApi]);
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
    // setWonHistory([]);
    setWin("");
    dispatch({
      type: "bets/fetchBetsStart",
      payload: {
        seq: 2,
        sessionUuid: "23d298bd-9264-4147-974f-06f4f19a3438",
        bets: [
          {
            betAmount: betValue,
            customData: {
              suit: prevCards.suit,
              value: prevCards.card,
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
    setActiveBtn({
      ...activeBtn,
      bet: true,
      collectAmount: false,
      betDec: true,
      betInc: true,
    });
  };
  // const winAmountArr: Array<any> = [];
  // if (wonHistory) {
  //   wonHistory.forEach((won: number, inx: number) => {
  //     won > 0 && winAmountArr.push(<li key={inx}>{won}</li>);
  //   });
  // }
  return device == "mobile" ? (
    <div className={styles.panel}>
      <div className="Pane Pane--data pane-rounded-corners">
        <div className="Pane__inner">
          <div className="Pane__body">
            <div className={styles.BalanceInfoPanel} id="BalanceInfoPanel">
              <div className="BalanceInfoPanel__container--info">
                {/* <!-- BALANCE --> */}
                <div id="BalanceItem" className={styles.BalanceInfoPanel__item}>
                  <span
                    id="BalanceLabel"
                    className="BalanceInfoPanel__label"
                    data-translation="balance"
                    data-charcount="12"
                  >
                    DEMO BALANCE
                  </span>
                  <span
                    id="BalanceValue"
                    className={styles.BalanceInfoPanel__value}
                    data-charcount="9"
                    style={{ marginLeft: "10px" }}
                  >
                    {balance}
                  </span>
                  <span
                    id="WinAmountLabel"
                    className="BalanceInfoPanel__label DataPanelItem__label WinAmount__text"
                    data-translation="win_uc"
                    data-charcount="3"
                    style={{ marginLeft: "10px" }}
                  >
                    WIN
                  </span>
                  <span
                    id="WinAmountValue"
                    className={styles.BalanceInfoPanel__value}
                    data-main-field="win-amount"
                    style={{ marginLeft: "10px" }}
                  >
                    {win}
                  </span>
                </div>
                {/* <!-- WIN AMOUNT STANDALONE --> */}
                <div
                  className="BalanceInfoPanel__item WinAmountStandalone"
                  id="WinAmountStandalone"
                >
                  <div
                    className="WinAmountStandalone__inner"
                    id="WinAmountItem"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BetUI activeBtn={activeBtn} setActiveBtn={setActiveBtn}></BetUI>
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

      <div className="Pane Pane--navbar pane-rounded-corners">
        <div className="Pane__inner">
          <div className={styles.MainNavbar} id="MainNavbar">
            <ul className={styles.MainNavbar__list}>
              <li className={styles.MainNavbar__item} id="SoundToggle">
                <span className="MainNavbar__icon icon-sound-on"></span>
                <span
                  className="MainNavbar__text"
                  data-translation="sound"
                  data-charcount="5"
                >
                  SOUND
                </span>
              </li>
              <li className="MainNavbar__item music-off" id="MusicToggle">
                <span className="MainNavbar__icon icon-music-on"></span>
                <span
                  className="MainNavbar__text"
                  data-translation="music"
                  data-charcount="5"
                >
                  MUSIC
                </span>
              </li>

              <li className={styles.MainNavbar__item} id="GameInfoBtn">
                <span className="MainNavbar__icon icon-info-a"></span>
                <span
                  className="MainNavbar__text"
                  data-translation="info_short_uc"
                  data-charcount="4"
                >
                  INFO
                </span>
              </li>

              <li
                className="MainNavbar__item MainNavbar__item--Lobby"
                id="LobbyAnchor"
              >
                <span className="MainNavbar__icon icon-home"></span>
                <span
                  className="MainNavbar__text"
                  data-translation="home"
                  data-charcount="4"
                >
                  HOME
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.panel}>
      <div className={styles.buttonControls}>
        <div className={styles.balance}>
          <span className={styles.betText}>Demo Balance: {balance}</span>
          <span className={styles.winText}>Win: {win}</span>
          {/* <ul className={styles.winUl}>{winAmountArr}</ul> */}
        </div>
        <div className={styles.buttonInfo}>
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
