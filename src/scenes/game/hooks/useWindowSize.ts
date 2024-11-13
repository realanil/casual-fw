import { useEffect, useState } from 'react';
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const or = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial window size
    handleResize();

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
