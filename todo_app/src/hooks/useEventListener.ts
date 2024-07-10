import { useEffect } from "react";

const useEventListener = (type: string, callback: EventListener, immediateExc: Function | undefined = undefined): void => {
  useEffect(() => {
    window.addEventListener(type, callback); // mount
    if (typeof immediateExc === 'function') {
      immediateExc();
    }

    return () => {
      window.removeEventListener(type, callback); // unmount
    }
  }, []);
}

export default useEventListener;