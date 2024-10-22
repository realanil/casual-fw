import { usePixi } from "@/context/PixiContext";
import { createContainer } from "@/helpers/container";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Button from "../core/Button";
import Sprite from "../core/Sprite";

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
  mobile: {
    rightArrow: {
      texture: "/assets/rightArrow.png",
      x: 0,
      y: 0,
      scaleX: 0.5,
      scaleY: 0.5,
      label: "rightArrow",
      cursor: false,
    },
    leftButton: {
      fontStyle: {
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
      },
      x: 0, //window.innerWidth / 2,
      y: 0, //window.innerHeight / 2,
      cursor: true,
      scaleX: 1,
      scaleY: 1,
    },
    rightButton: {
      fontStyle: {
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
      },
      x: 0,
      y: 0,
      cursor: true,
      scaleX: 1,
      scaleY: 1,
    },
  },
  desktop: {
    container: {
      x: 960,
      y: 472.5,
    },
    rightArrow: {
      texture: "/assets/rightArrow.png",
      x: 200,
      y: -247.5,
      scaleX: 0.35,
      scaleY: 0.35,
      label: "rightArrow",
      cursor: true,
    },
    leftButton: {
      fontStyle: fontStyle,
      x: -470, //window.innerWidth / 2,
      y: 0, //window.innerHeight / 2,
      cursor: false,
      scaleX: 1,
      scaleY: 1,
    },
    rightButton: {
      fontStyle: fontStyle,
      x: 440,
      y: 0,
      cursor: true,
      scaleX: 1,
      scaleY: 1,
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
const CardAction: React.FC = () => {
  const { app, device } = usePixi();
  const [deviceConfig, setDeviceConfig] = useState(dataConfiguraton[device]);
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
    if (deviceConfig?.container) {
      container.x = deviceConfig.container.x;
      container.y = deviceConfig.container.y;
    }
    setParentConRef(container);
  }, []);

  useEffect(() => {
    console.log("dataApi=>", apiData.data);
    if (apiData.data.round.roundId) {
      setBtnSetting((prevState: any) => ({
        ...prevState,
        left: true,
        right: true,
        newCard: true,
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
            {...deviceConfig?.rightArrow}
            app={app}
            container={parentConRef}
            onclick={() => onNext("newCard")}
            cursor={btnSetting?.newCard}
          />
          <Button
            TextStyle={deviceConfig?.leftButton}
            title={"Lower and Same"}
            label={"leftButton"}
            cursor={btnSetting?.left}
            app={app}
            container={parentConRef}
            onclick={() => onNext("lessOrEqual")}
          />
          <Button
            TextStyle={deviceConfig?.rightButton}
            title={"Higher and Same"}
            label={"rightButton"}
            app={app}
            container={parentConRef}
            cursor={btnSetting?.left}
            onclick={() => onNext("greaterOrEqual")}
          />
          {/* <Text
            TextStyle={deviceConfig?.rightButton}
            title={"Higher and Same"}
            label={"rightButton"}
            app={app}
            container={parentConRef}
            onclick={clickEventBtn}
          /> */}
        </>
      )}
    </>
  );
};
export default CardAction;
