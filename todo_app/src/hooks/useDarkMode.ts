import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "../state/common";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => { setIsDarkMode(e.matches) }
    mediaQuery.addEventListener('change', handleChange); // mount

    return () => {
      mediaQuery.removeEventListener('change', handleChange); // unmount
    }
  }, [])

  return [isDarkMode, setIsDarkMode];
}

export default useDarkMode;