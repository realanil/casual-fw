import Button from "@/components/core/Button";
import Sprite from "@/components/core/Sprite";
import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";

const fontStyle: any = {
  fontFamily: "Arial",
  dropShadow: {
    alpha: 0.8,
    angle: 2.1,
    blur: 4,
    color: "0x111111",
    distance: 10,
  },
  fill: "#ffffff",
  // stroke: { color: "#004620", width: 12, join: "round" },
  fontSize: 24,
  fontWeight: "lighter",
};

const dataConfiguraton: any = {
  rightArrow: {
    texture: "/assets/rightArrow.png",
    x: 0,
    y: 0,
    scaleX: 0.15,
    scaleY: 0.15,
    label: "rightArrow",
    cursor: true,
    desktop: {
      x: 200,
      y: -247.5,
    },
    mobile: {
      x: 320,
      y: 150,
    },
  },
  leftAction: {
    texture: "/assets/downArrow.png",
    scaleX: 0.15,
    scaleY: 0.15,
    label: "leftAction",
    cursor: true,
    desktop: {
      x: -343,
      y: 30,
    },
    mobile: {
      x: 20,
      y: 320,
    },
  },
  rightAction: {
    texture: "/assets/upArrow.png",
    scaleX: 0.15,
    scaleY: 0.15,
    label: "rightAction",
    cursor: true,
    desktop: {
      x: 350,
      y: 30,
    },
    mobile: {
      x: 350,
      y: 320,
    },
  },
  leftButton: {
    fontStyle: fontStyle,
    cursor: true,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: -370, //window.innerWidth / 2,
      y: 0, //window.innerHeight / 2,
    },
    mobile: {
      x: 10,
      y: 280,
    },
  },
  rightButton: {
    fontStyle: fontStyle,
    cursor: true,
    scaleX: 1,
    scaleY: 1,
    desktop: {
      x: 340,
      y: 0,
    },
    mobile: {
      x: 330,
      y: 280,
    },
  },

  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
  },
};
interface DataType {
  id: number;
  name: string;
}

interface btnInterface {
  left: boolean;
  right: boolean;
  newCard: boolean;
}

interface buttonTextsInterface {
  left: string;
  right: string;
  bgHeight: number;
}
const GameButton: React.FC = () => {
  const width = window.innerWidth;
  dataConfiguraton.desktop.container.x = width / 2;
  const { app, device } = usePixi();
  // const [deviceConfig, setDeviceConfig] = useState(dataConfiguraton[device]);
  const [btnSetting, setBtnSetting] = useState<btnInterface>({
    left: false,
    right: false,
    newCard: false,
  });
  const containerRef = useRef<PIXI.Container | null>(null);
  const [parentConRef, setParentConRef] = useState<PIXI.Container | null>(null);
  //Action
  // const [state, dispatch] = useReducer(reducer<DataType>, initialState);
  const apiData: any = useAppSelector((state) => state.bet);
  const dispatch = useAppDispatch();
  const [buttonTexts, setButtonTexts] = useState<buttonTextsInterface>({
    left: "Same or Lower",
    right: "Same or Higher",
    bgHeight: 50,
  });
  //
  useEffect(() => {
    // Check if the container already exists
    const continerRef: any = createContainer(
      PIXI,
      app,
      containerRef,
      "cardActionContainer",
      null
    );
    const container = continerRef.current;
    if (dataConfiguraton[device]?.container) {
      container.x = dataConfiguraton[device].container.x;
      container.y = dataConfiguraton[device].container.y;
    } else {
      dataConfiguraton?.leftButton?.fontStyle?.fontSize &&
        (dataConfiguraton.leftButton.fontStyle.fontSize = 12);
      dataConfiguraton?.rightButton?.fontStyle?.fontSize &&
        (dataConfiguraton.rightButton.fontStyle.fontSize = 12);
      console.log(
        "dataConfiguraton.leftAction=>",
        dataConfiguraton.rightButton
      );
    }
    setParentConRef(container);
  }, []);

  useEffect(() => {
    if (apiData.data.round.roundId) {
      setBtnSetting((prevState: any) => ({
        ...prevState,
        left: apiData.data.round.status != "completed" ? true : false,
        right: apiData.data.round.status != "completed" ? true : false,
        newCard: apiData.data.round.status != "completed" ? true : false,
      }));
    }
  }, [apiData.data]);

  useEffect(() => {
    console.log("responseCard=>", apiData.responseCard);
    apiData.responseCard.round.status == "completed" &&
      setBtnSetting((prevState: any) => ({
        ...prevState,
        left: false,
        right: false,
        newCard: false,
      }));

    if (apiData.responseCard.round.status != "completed") {
      apiData.responseCard.round.events.forEach((event: any) => {
        if (event.c?.card?.value == 1) {
          setButtonTexts((prevState) => ({
            ...prevState,
            left: "Same",
            right: "Same or Higher",
          }));
        } else if (event.c?.card?.value == 13) {
          setButtonTexts((prevState) => ({
            ...prevState,
            left: "Same or Lower",
            right: "Same",
          }));
        } else {
          setButtonTexts((prevState) => ({
            ...prevState,
            left: "Same or Lower",
            right: "Same or Higher",
          }));
        }
        event.c?.choices &&
          event.c?.choices.forEach((element: any) => {
            ["greaterOrEqual", "greater"].includes(element.action) &&
              setButtonTexts((prevState) => ({
                ...prevState,
                right: `${prevState.right}\nx.${element.winFactor}`,
                bgHeight: 70,
              }));
            ["equal", "lessOrEqual"].includes(element.action) &&
              setButtonTexts((prevState) => ({
                ...prevState,
                left: `${prevState.left}\nx.${element.winFactor}`,
                bgHeight: 70,
              }));
          });
      });
    }
  }, [apiData.responseCard]);
  const clickEventBtn = () => {
    console.log("Coming soon...");
  };
  const onNext = async (actionType: string) => {
    const payload = {
      seq: 4,
      sessionUuid: "118552a6-a7be-4870-ac75-4624f7b84318",
      roundId: apiData.data.round.roundId,
      continueInstructions: { action: actionType },
    };
    dispatch({ type: "bets/newCard", payload });
    // e.preventDefault();
    // console.log("onNext=>", payload);
  };

  return (
    <>
      {!parentConRef ? null : (
        <>
          <Sprite
            {...dataConfiguraton.rightArrow}
            {...dataConfiguraton.rightArrow[device]}
            app={app}
            container={parentConRef}
            onclick={() => onNext("newCard")}
            cursor={btnSetting?.newCard}
          />
          <Sprite
            {...dataConfiguraton.leftAction}
            {...dataConfiguraton.leftAction[device]}
            app={app}
            container={parentConRef}
            cursor={btnSetting?.left}
            onclick={() => onNext("lessOrEqual")}
          />
          <Button
            {...dataConfiguraton.leftButton}
            {...dataConfiguraton.leftButton[device]}
            title={buttonTexts.left}
            label={"leftButton"}
            cursor={btnSetting?.left}
            bgHeight={buttonTexts?.bgHeight}
            app={app}
            container={parentConRef}
            onclick={() => onNext("lessOrEqual")}
          />
          <Sprite
            {...dataConfiguraton.rightAction}
            {...dataConfiguraton.rightAction[device]}
            app={app}
            container={parentConRef}
            cursor={btnSetting?.left}
            onclick={() => onNext("greaterOrEqual")}
          />
          <Button
            {...dataConfiguraton.rightButton}
            {...dataConfiguraton.rightButton[device]}
            title={buttonTexts.right}
            label={"rightButton"}
            app={app}
            container={parentConRef}
            cursor={btnSetting?.left}
            bgHeight={buttonTexts?.bgHeight}
            onclick={() => onNext("greaterOrEqual")}
          />
        </>
      )}
    </>
  );
};
export default GameButton;
