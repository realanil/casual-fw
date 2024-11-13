import React, { useState } from "react";
import styles from "./betSlider.module.css"; // Adjust to your CSS file path

interface betInterFace {
  minBet: any;
  maxBet: number;
  bet: string;
  onBetChange: (e: any) => any;
}
const BetSlider: React.FC<betInterFace> = ({
  bet,
  minBet,
  maxBet,
  onBetChange,
}) => {
  const betArray = [10, 20, 50, 100, 200, 500]; // Array of predefined bet amounts
  const [betAmount, setBetAmount] = useState(betArray[0]); // Start with the first value in the array

  //   const [betAmount, setBetAmount] = useState(minBet); // Initialize the bet with the minimum value

  //   const handleSliderChange = (event: any) => {
  //     const newBetAmount = Number(event.target.value);
  //     setBetAmount(newBetAmount);
  //     onBetChange(newBetAmount); // Pass the updated bet amount to the parent component
  //   };
  // Function to find the nearest value from the array
  const getClosestBet = (value: any) => {
    const closest = betArray.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    return closest;
  };

  const handleSliderChange = (e: any) => {
    const value = Number(e.target.value);
    const closestBet = getClosestBet(value); // Get the closest bet amount from the array
    setBetAmount(closestBet); // Update the betAmount to the closest value
  };
  return (
    <div className={styles.betSliderContainer}>
      <label htmlFor="betSlider" className={styles.betSliderLabel}>
        Bet Amount: <span className={styles.betAmount}>{betAmount}</span>
      </label>
      <input
        type="range"
        id="betSlider"
        className={styles.betSlider}
        min="0"
        max={betArray.length - 1} // Maximum index of the betArray
        step="1"
        value={betArray.indexOf(betAmount)} // Use the index of the current bet in the array
        onChange={handleSliderChange}
      />
      <div className={styles.betRange}>
        <span>{minBet}</span>
        <span>{maxBet}</span>
      </div>
    </div>
  );
};

export default BetSlider;
