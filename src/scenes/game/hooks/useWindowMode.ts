/*import { isMobileDevice } from '@/utils/deviceDetectionj';
import { useEffect, useState } from 'react';
interface WindowMode {
  orientation: string | undefined;
  device: string;
}

function useWindowMode(): WindowMode {
  const [windowMode, setWindowMode] = useState<WindowMode>({
    orientation: undefined,
    device: "desktop"
  });

  useEffect(() => {
    const or = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    const deviceName: any =  window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    const handleResize = () => {
      
      console.log("ppppppppppp=>", window.innerWidth > window.innerHeight ? 'landscape' : 'portrait')
      setWindowMode({
        orientation: deviceName,
        device: isMobileDevice() == "mobile" && or == "landscape" ? "desktop":  isMobileDevice()
      });
    };

    // Set initial window size
    handleResize();

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowMode;
}

export default useWindowMode;
*/
// hooks/useOrientation.ts
import { useEffect, useState } from 'react';

type Orientation = 'landscape' | 'portrait';

function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > window.innerHeight) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };

    // Initialize on mount
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return orientation;
}

export default useOrientation;
