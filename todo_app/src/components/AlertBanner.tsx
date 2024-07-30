import React from 'react';
import { useRecoilState } from 'recoil';
import useEventListener from '../hooks/useEventListener';
import { alertState } from '../state/common';
import { Alert } from '../types/components';
import { Banner } from './AlertBanner.style';

const AlertBanner: React.FC = () => {
  const [alert, setAlert] = useRecoilState(alertState);
  useEventListener('alert', (e) => {
    const event = e as CustomEvent<Alert>;
    setAlert({
      alertIsActive: event.detail.alertIsActive,
      alertText: event.detail.alertText
    });
    window.location.reload();
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
        <Banner>
          <span>{alert.alertText}</span>
          <button onClick={closeAlert}>x</button>
        </Banner>
        : <></>}
    </>
  )
}

export default AlertBanner