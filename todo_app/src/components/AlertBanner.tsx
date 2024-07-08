import React from 'react'
import { alertState } from '../state/common';
import { useRecoilState } from 'recoil';
import useEventListener from '../hooks/useEventListener';
import useDispatchEvent from '../hooks/useDispatchEvent';

const AlertBanner: React.FC = () => {
  const [alert, setAlert] = useRecoilState(alertState);
  const alertEvent = useDispatchEvent('alert');
  useEventListener('alert', () => {
    console.trace('alert!');
    setAlert({
      alertIsActive: true,
      alertText: "Test!!!!!"
    });
  });

  const closeAlert = () => {
    setAlert({
      alertIsActive: false,
      alertText: ''
    });
  }

  return (
    <>
      {alert.alertIsActive ?
        <div>
          <span>{alert.alertText}</span>
          <button onClick={closeAlert}>x</button>
        </div>
        : <></>}
    </>
  )
}

export default AlertBanner