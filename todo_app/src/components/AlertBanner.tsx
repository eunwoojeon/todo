import React from 'react';
import { useRecoilState } from 'recoil';
import useEventListener from '../hooks/useEventListener';
import { alertState } from '../state/common';
import { Alert } from '../types/components';
import styles from './AlertBanner.module.css';

const AlertBanner: React.FC = () => {
  const [alert, setAlert] = useRecoilState(alertState);
  useEventListener('alert', (e) => {
    console.trace('alert!');
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
        <div className={styles.banner}>
          <span>{alert.alertText}</span>
          <button onClick={closeAlert}>x</button>
        </div>
        : <></>}
    </>
  )
}

export default AlertBanner