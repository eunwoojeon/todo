import Modal from 'react-modal';
import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../state/userAtoms";
import GoogleLoginButton from './GoogleLoginButton';
import axios from 'axios';

const NavigatorBar: React.FC = () => {
  // Modal setting
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
      .get('http://localhost:4000/user/logout/google')
      .then((res) => { resetUser() })
      .then((res) => {
        localStorage.removeItem('todo-login-key');
        window.dispatchEvent(new Event('storage'));
      })
      .catch(console.error);
  }

  // login/logout button 조건부 렌더링
  const loginButton = user.isLogin ? <button onClick={logout}>로그아웃</button> : <button onClick={openModal}>로그인</button>

  return (
    <div>
      NavigatorBar
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