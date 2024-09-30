// components/Loading.tsx
import React from "react";
import styles from "./Loading.module.css";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* <div className={styles.progressText}>{progress}%</div> */}
    </div>
  );
};

export default Loading;
