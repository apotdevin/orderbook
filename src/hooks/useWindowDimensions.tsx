import * as React from 'react';
import { debounce } from 'lodash';

export interface WindowDimensions {
  width: number;
  height: number;
}

export const getWindowDimensions = (): WindowDimensions => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};

const useWindowDimensions = (delay = 250) => {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions()
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    handleResize();
    const debouncedHandle = debounce(handleResize, delay);

    window.addEventListener('resize', debouncedHandle);
    return () => window.removeEventListener('resize', debouncedHandle);
  }, [delay]);

  return windowDimensions;
};

export default useWindowDimensions;
