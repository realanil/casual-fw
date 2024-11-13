import { usePixi } from "@/context/PixiContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useWindowSize from "@/scenes/game/hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import BetUI from "./BetUI";
import Modal from "./Modal";
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
  const { width, height } = useWindowSize();
  const scaleFactor = width && height ? Math.min(width, height) / 1000 : 1; // Scale based on the smaller dimension

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { device } = usePixi();
  const [win, setWin] = useState<string>("0.00");
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
    setWin("0.00");
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
  //!
  /* const [scaleFactor, setScaleFactor] = useState(1);

  // Update the scale factor when the window is resized
  useEffect(() => {
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
  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //!SECTION

  // const winAmountArr: Array<any> = [];
  // if (wonHistory) {
  //   wonHistory.forEach((won: number, inx: number) => {
  //     won > 0 && winAmountArr.push(<li key={inx}>{won}</li>);
  //   });
  // }
  // return device == "mobile" ? (
  //   <div className={styles.panel}>
  //     <div className="Pane Pane--data pane-rounded-corners">
  //       <div className="Pane__inner">
  //         <div className="Pane__body">
  //           <div className={styles.BalanceInfoPanel} id="BalanceInfoPanel">
  //             <div className="BalanceInfoPanel__container--info">
  //               {/* <!-- BALANCE --> */}
  //               <div id="BalanceItem" className={styles.BalanceInfoPanel__item}>
  //                 <span
  //                   id="BalanceLabel"
  //                   className="BalanceInfoPanel__label"
  //                   data-translation="balance"
  //                   data-charcount="12"
  //                 >
  //                   DEMO BALANCE
  //                 </span>
  //                 <span
  //                   id="BalanceValue"
  //                   className={styles.BalanceInfoPanel__value}
  //                   data-charcount="9"
  //                   style={{ marginLeft: "10px" }}
  //                 >
  //                   {balance}
  //                 </span>
  //                 <span
  //                   id="WinAmountLabel"
  //                   className="BalanceInfoPanel__label DataPanelItem__label WinAmount__text"
  //                   data-translation="win_uc"
  //                   data-charcount="3"
  //                   style={{ marginLeft: "10px" }}
  //                 >
  //                   WIN
  //                 </span>
  //                 <span
  //                   id="WinAmountValue"
  //                   className={styles.BalanceInfoPanel__value}
  //                   data-main-field="win-amount"
  //                   style={{ marginLeft: "10px" }}
  //                 >
  //                   {win}
  //                 </span>
  //               </div>
  //               {/* <!-- WIN AMOUNT STANDALONE --> */}
  //               <div
  //                 className="BalanceInfoPanel__item WinAmountStandalone"
  //                 id="WinAmountStandalone"
  //               >
  //                 <div
  //                   className="WinAmountStandalone__inner"
  //                   id="WinAmountItem"
  //                 ></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <BetUI activeBtn={activeBtn} setActiveBtn={setActiveBtn}></BetUI>
  //     {activeBtn.bet && (
  //       <button
  //         onClick={(e) => {
  //           onBet(e);
  //           playSound();
  //         }}
  //         className={styles.spinButton}
  //       >
  //         Bet
  //       </button>
  //     )}
  //     {activeBtn.collectAmount && (
  //       <button
  //         onClick={(e) => {
  //           onCollectAmount(e);
  //         }}
  //         className={styles.spinButton}
  //       >
  //         Collect <span>{collectAmount.total}</span>
  //       </button>
  //     )}

  //     <div className="Pane Pane--navbar pane-rounded-corners">
  //       <div className="Pane__inner">
  //         <div className={styles.MainNavbar} id="MainNavbar">
  //           <ul className={styles.MainNavbar__list}>
  //             <li className={styles.MainNavbar__item} id="SoundToggle">
  //               <span className="MainNavbar__icon icon-sound-on"></span>
  //               <span
  //                 className="MainNavbar__text"
  //                 data-translation="sound"
  //                 data-charcount="5"
  //               >
  //                 SOUND
  //               </span>
  //             </li>
  //             <li className="MainNavbar__item music-off" id="MusicToggle">
  //               <span className="MainNavbar__icon icon-music-on"></span>
  //               <span
  //                 className="MainNavbar__text"
  //                 data-translation="music"
  //                 data-charcount="5"
  //               >
  //                 MUSIC
  //               </span>
  //             </li>

  //             <li className={styles.MainNavbar__item} id="GameInfoBtn">
  //               <span className="MainNavbar__icon icon-info-a"></span>
  //               <span
  //                 className="MainNavbar__text"
  //                 data-translation="info_short_uc"
  //                 data-charcount="4"
  //               >
  //                 INFO
  //               </span>
  //             </li>

  //             <li
  //               className="MainNavbar__item MainNavbar__item--Lobby"
  //               id="LobbyAnchor"
  //             >
  //               <span className="MainNavbar__icon icon-home"></span>
  //               <span
  //                 className="MainNavbar__text"
  //                 data-translation="home"
  //                 data-charcount="4"
  //               >
  //                 HOME
  //               </span>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //fixed bottom-0 left-0 w-full bg-gray-900 p-4 z-10
  // <div className="fixed flex bottom-0 justify-center w-full bg-gray-900 gap-6 mt-20 p-4 z-10"></div>
  console.log("object=>", activeBtn.bet || activeBtn.collectAmount ? 500 : 0);
  return (
    <>
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />

      <div
        className="fixed flex bottom-0 justify-center w-full bg-gray-900 gap-6 mt-20 p-4 z-10"
        style={{
          width: "auto",
          height: "auto",
          // marginLeft: "150px",
          transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
        }}
      >
        <div className="mb-1">
          {/* Box Section at the Top */}
          <div className="flex justify-center gap-0 mt-4">
            {/* Box 1 */}
            <div
              className="bg-blue-00 text-white text-center rounded-lg transform transition-transform duration-300 mb-1"
              style={{
                width: "350px",
                height: "50px",
                // transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
              }}
            >
              <div className="ml-10">
                <span className="block">Demo Balance: {balance}</span>
                <span className="block">Win: {win}</span>
              </div>
            </div>

            {/* Box 2 */}

            <BetUI
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
              scaleFactor={scaleFactor}
            />

            <div
              className={`bg-green-00 text-white text-center rounded-lg transform transition-transform duration-300`}
              style={{
                width: "100px",
                height: "50px",
                // marginLeft: "150px",
                // transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
              }}
            >
              <div className="mt-0">
                {activeBtn.bet && (
                  <button
                    className={`bg-green-${
                      activeBtn.bet || activeBtn.collectAmount ? 500 : 0
                    } text-white text-center rounded-lg transform transition-transform duration-300 hover:bg-green-700 p-1`}
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
                )}
                {activeBtn.collectAmount && (
                  <button
                    className={`bg-green-${
                      activeBtn.bet || activeBtn.collectAmount ? 500 : 0
                    } text-white text-center rounded-lg transform transition-transform duration-300 hover:bg-green-700 p-1`}
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
                )}
              </div>
            </div>

            {/* Box 3 */}
            <div
              className="bg-red-0 text-white text-center rounded-lg transform transition-transform duration-300"
              style={{
                width: "350px",
                height: "50px",
                // marginLeft: "150px",
                // transform: `scale3d(${scaleFactor}, ${scaleFactor}, 1)`, // Apply dynamic scaling
              }}
            >
              <div className="ml-4 ">
                <a
                  href="#"
                  onClick={toggleMusic}
                  className="block text-white hover:text-yellow-300 mb-2 transition duration-300 float-left"
                >
                  {musicPlaying ? "Mute Music" : "Play Music"}
                </a>
                <a
                  href="#"
                  onClick={openModal}
                  className="block text-white hover:text-yellow-300 mb-2 transition duration-300 float-left ml-5"
                >
                  Info
                </a>
                <a
                  href="#"
                  onClick={() => alert("Home button clicked!")}
                  className="block text-white hover:text-yellow-300 mb-2 transition duration-300 float-left ml-5"
                >
                  Home
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Box Section at the Bottom */}
      </div>
    </>
  );
  // <div className={styles.panel}>
  //   <div className={styles.buttonControls}>
  //     <div className={styles.balance}>
  //       <span className={styles.betText}>Demo Balance: {balance}</span>
  //       <span className={styles.winText}>Win: {win}</span>
  //     </div>
  //     <BetUI activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
  //     <div className={styles.betControls}>
  //       {activeBtn.bet && (
  //         <button
  //           onClick={(e) => {
  //             onBet(e);
  //             playSound();
  //           }}
  //           className={styles.spinButton}
  //         >
  //           Bet
  //         </button>
  //       )}
  //       {activeBtn.collectAmount && (
  //         <button
  //           onClick={(e) => {
  //             onCollectAmount(e);
  //           }}
  //           className={styles.spinButton}
  //         >
  //           Collect <span>{collectAmount.total}</span>
  //         </button>
  //       )}
  //     </div>
  //     <div className={styles.buttonInfo}>
  //       <button onClick={toggleMusic} className={styles.musicButton}>
  //         {musicPlaying ? "Mute Music" : "Play Music"}
  //       </button>
  //       <button
  //         onClick={() => alert("Info button clicked!")}
  //         className={styles.infoButton}
  //       >
  //         Info
  //       </button>
  //       <button
  //         onClick={() => alert("Home button clicked!")}
  //         className={styles.homeButton}
  //       >
  //         Home
  //       </button>
  //     </div>
  //   </div>

  // </div>
  // );
};

export default ButtonPanel;
