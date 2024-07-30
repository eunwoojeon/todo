import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => { setIsDarkMode(e.matches) }
    mediaQuery.addEventListener('change', handleChange); // mount

    return () => {
      mediaQuery.removeEventListener('change', handleChange); // unmount
    }
  }, [])

  return isDarkMode;
}

export default useDarkMode;