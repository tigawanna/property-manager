import { useLayoutEffect, useState } from "react";

export function useScreenDimensions() {
  const screen_breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  } as const;
  const [dimensions, setDimensions] = useState({
    width: -1,
    height: -1,
  });

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial set
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    ...dimensions,
    screen_breakpoints,
  };
}
