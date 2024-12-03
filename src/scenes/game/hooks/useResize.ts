// hooks/useResize.ts
import { throttle } from 'lodash';
import { useEffect } from 'react';

const useResize = (onResize: (width: number, height: number) => void) => {
  useEffect(() => {
    // Throttle the resize event handler (e.g., 200ms throttle interval)
    const throttledResize = throttle(() => {
      onResize(window.innerWidth, window.innerHeight);
    }, 200);

    // Add the resize event listener
    window.addEventListener('resize', throttledResize);

    // Cleanup the event listener and cancel throttling on unmount
    return () => {
      window.removeEventListener('resize', throttledResize);
      throttledResize.cancel();
    };
  }, [onResize]);
};

export default useResize;
