import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../state/userAtoms";
import GoogleLoginButton from './GoogleLoginButton';
import './NavigatorBar.css';

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
      .get('http://localhost:4000/user/logout/google', {withCredentials: true})
      .then((res) => { resetUser() })
      // login 동기화
      // .then(() => {
      //   localStorage.removeItem('todo-login-key');
      //   window.dispatchEvent(new Event('storage'));
      // })
      .catch(console.error)
      .finally(() => { window.location.reload() }) // 새로고침
  }
  // login/logout button 조건부 렌더링
  const loginButton = user.isLogin ? <button onClick={logout}>Sign out</button> : <button onClick={openModal}>Sign in</button>

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
      <button>{isDarkMode? 'Light Mode':'Dark Mode'}</button>
      {loginButton}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <h1>Log In</h1>
        <button onClick={closeModal}>닫기</button>
        <GoogleLoginButton />
        <button>Login as Guest</button>
      </Modal>
    </div>
  )
}

export default NavigatorBar