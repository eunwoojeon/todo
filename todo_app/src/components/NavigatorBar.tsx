import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../state/userAtoms";
import GoogleLoginButton from './GoogleLoginButton';
import './NavigatorBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';

const NavigatorBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      width: '300px',
      height: '400px',
      margin: 'auto',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '20px',
    }
  }

  // logout request
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const logout = async () => {
    await axios
      .get('http://localhost:4000/user/logout/google', { withCredentials: true })
      .then((res) => {
        resetUser();
        setIsOpen(false);
      })
      // login 동기화
      // .then(() => {
      //   localStorage.removeItem('todo-login-key');
      //   window.dispatchEvent(new Event('storage'));
      // })
      .catch(console.error)
      .finally(() => { window.location.reload() }) // 새로고침
  }

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => { setIsDarkMode(e.matches) }
    mediaQuery.addEventListener('change', handleChange); // mount

    return () => {
      mediaQuery.removeEventListener('change', handleChange); // unmount
    }
  }, []);

  return (
    <div className='navBar'>
      {isDarkMode ? <FontAwesomeIcon icon={faSun} size="lg" style={{ color: 'var(--fontawesome)', cursor: 'pointer' }} /> : <FontAwesomeIcon icon={faMoon} size="lg" style={{ color: 'var(--fontawesome)', cursor: 'pointer' }} />}
      {user.isLogin ?
        <>
          <button className='nav-btn login-btn eng-font' onClick={openModal}>Log Out</button>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}>
            <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeModal} style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '1.2rem'
            }} />
            <h1>Log Out</h1>
            <button onClick={logout}>Log Out</button>
          </Modal>
        </> :
        <>
          <button className='nav-btn login-btn eng-font' onClick={openModal}>Log In</button>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}>
            <h1>Log In</h1>
            <FontAwesomeIcon icon={faXmark} size="lg" onClick={closeModal} style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '1.2rem'
            }} />
            <GoogleLoginButton closeModal={() => { setIsOpen(false) }} />
            <button>Login as Guest</button>
          </Modal>
        </>}
    </div>
  )
}

export default NavigatorBar