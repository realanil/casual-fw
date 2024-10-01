import React, { useState } from "react";
import styles from "./ButtonPanel.module.css";
interface ButtonPanelProps {
  onSpin: () => void;
  onBetIncrease: () => void;
  onBetDecrease: () => void;
  currentBet: number;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({
  onSpin,
  onBetIncrease,
  onBetDecrease,
  currentBet,
}) => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
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

      <div className={styles.spinControl}>
        <div className={styles.betControls}>
          <button
            onClick={() => {
              onBetDecrease();
              playSound();
            }}
            className={styles.button}
          >
            -
          </button>
          <span className={styles.betText}>Bet: ${currentBet}</span>
          <button
            onClick={() => {
              onBetIncrease();
              playSound();
            }}
            className={styles.button}
          >
            +
          </button>
          <button
            onClick={() => {
              onSpin();
              playSound();
            }}
            className={styles.spinButton}
          >
            Spin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonPanel;
