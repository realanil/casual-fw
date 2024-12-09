import { usePixi } from "@/context/PixiContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { playSound, stopSound } from "@/lib/soundControl";
import useWindowSize from "@/scenes/game/hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import DesktopButtonUI from "./DesktopButtonUI";
import MobileButtonUI from "./MobileButtonUI";
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
  const isMobile = isMobileDevice();
  const [isPortrait, setPortrait] = useState<boolean>(false);
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
      setActiveBtn({
        ...activeBtn,
        bet: true,
        collectAmount: false,
        betInc: true,
        betDec: true,
      });
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
    // console.log("collectApi=>", collectApi);
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
  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  // const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
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
    !musicPlaying && playSound("onBet", "th_mx_big_win_intro", false, 1); // Play Sound
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
  const clickSound = () => {
    // if (soundEnabled) {
    //   const audio = new Audio(sound);
    //   audio.play();
    // }
  };

  const soundAction = (
    e: any,
    soundId: string = "",
    soundSprite: string = "",
    loop: boolean = false,
    valume: number = 1
  ) => {
    e.preventDefault();
    if (soundId == "sound") {
      !soundPlaying && playSound(soundId, soundSprite, loop, valume); // Play Sound
      soundPlaying && stopSound(soundId); // Stop Sound
      setSoundPlaying(!soundPlaying);
    } else if (soundId == "music") {
      dispatch({
        type: "counter/soundAsync",
        payload: { sound: !musicPlaying },
      });
      setMusicPlaying(!musicPlaying);
    } else {
      musicPlaying && playSound(soundId, soundSprite, loop, valume); // Play Sound
    }
  };
  const onCollectAmount = (e: any) => {
    e.preventDefault();
    !musicPlaying && playSound("collect", "th_sx_multiplier_awarded", false, 1); // Play Sound
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

  // Open the modal
  const openModal: any = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //!SECTION

  // console.log("isMobile=->", isMobile, isPortrait);
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    /Mobi|Android/i.test(userAgent) && chkPortrait();
  }, [window.innerWidth]);
  const chkPortrait = (): void => {
    const userAgent = window.navigator.userAgent;
    console.log(
      "pppp=>",
      window.innerWidth < window.innerHeight,
      window.innerWidth,
      window.innerHeight,
      window.outerWidth,
      window.outerHeight
    );
    setPortrait(
      /Mobi|Android/i.test(userAgent) && window.outerWidth < window.outerHeight
        ? window.innerWidth < window.innerHeight
        : false
    );
  };
  const allAction: any = {
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
  };
  return (
    <>
      {/* <TestUI/> */}

      <Modal isOpen={isModalOpen} closeModal={closeModal} />
      {isPortrait == true ? (
        <MobileButtonUI {...allAction} />
      ) : (
        <DesktopButtonUI {...allAction} />
      )}
    </>
  );
};
export const isMobileDevice = (): string => {
  const userAgent = window.navigator.userAgent;
  return "desktop"; ///Mobi|Android/i.test(userAgent) ? "mobile" : "desktop";
};
export default ButtonPanel;
