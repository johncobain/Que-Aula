import { ReactNode, useEffect } from "react";

export const useMediaQuery = (
  trigger: (mediaQuery: MediaQueryList) => void,
  viewport: number,
  ...rest: ReactNode[]
) => {
  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(min-width: ${viewport}px)`);

    trigger(mediaQueryList);

    const handleChange = () => {
      trigger(mediaQueryList);
    };

    window.addEventListener("resize", handleChange);
    return () => window.removeEventListener("resize", handleChange);
  }, rest);
};
