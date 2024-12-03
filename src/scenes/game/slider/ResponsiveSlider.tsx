import React, { useEffect, useState } from "react";
import styles from "./ResponsiveSlider.module.css";

const slides = [
  "Slide 1 - Welcome!",
  "Slide 2 - Features",
  "Slide 3 - Pricing",
];

const ResponsiveSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVis, setIsVis] = useState<boolean>(true);

  // Function to move to the next slide
  const nextSlide = () => {
    const currentInd: number = currentIndex == 2 ? 0 : currentIndex + 1;
    // setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    // setCurrentIndex(currentInd);
    setCurrentIndex((prevIndex) => {
      if (prevIndex == 2) {
        setIsVis(false);
      } else {
        setIsVis(true);
      }
      return prevIndex == 2 ? 0 : prevIndex + 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slides}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          display: isVis,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <h2>{slide}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveSlider;
