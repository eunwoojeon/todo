import { faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from "react";
import Modal from 'react-modal';
import { useRecoilState, useResetRecoilState } from "recoil";
import { darkModeState } from '../state/common';
import { userState } from "../state/userAtoms";
import { StyledFontAwesomeIcon } from '../style/common.style';
import GoogleLoginButton from './GoogleLoginButton';
import { LoginButton, ModalButton, ModalButtonPanel, NaviBar, XmarkFontAwesomeIcon } from './NavigatorBar.style';

const NavigatorBar: React.FC = () => {
  // modal window setting
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      width: '300px',
      height: '300px',
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
    axios
      // .get('http://localhost:4000/user', { withCredentials: true })
      .get(process.env.REACT_APP_API_URL + '/user', { withCredentials: true })
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

  const deleteUser = async () => {
    if (window.confirm('데이터가 영구 삭제됩니다. 탈퇴하시겠습니까?')) {
      axios
        // .delete('http://localhost:4000/user', { withCredentials: true })
        .delete(process.env.REACT_APP_API_URL + '/user', { withCredentials: true })
        .then((res) => {
          console.log('성공');
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
  }

  // dark mode
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeState);

  return (
    <NaviBar>
      {isDarkMode ? <StyledFontAwesomeIcon icon={faMoon} size="lg" onClick={() => { setIsDarkMode(false) }} /> : <StyledFontAwesomeIcon icon={faSun} size="lg" onClick={() => { setIsDarkMode(true) }} />}
      {user.isLogin ?
        <>
          <LoginButton className='eng-font' onClick={openModal}>Log Out</LoginButton>
          <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
            <XmarkFontAwesomeIcon icon={faXmark} size="lg" onClick={closeModal} />
            <h1 className='eng-font'>Log Out</h1>
            <ModalButtonPanel>
              <ModalButton className='eng-font' onClick={logout}>Log Out</ModalButton>
              <ModalButton className='eng-font' onClick={deleteUser}>사용자 정보 삭제/탈퇴하기</ModalButton>
            </ModalButtonPanel>
          </Modal>
        </> :
        <>
          <LoginButton className='eng-font' onClick={openModal}>Log In</LoginButton>
          <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
            <XmarkFontAwesomeIcon icon={faXmark} size="lg" onClick={closeModal} />
            <h1 className='eng-font'>Log In</h1>
            <ModalButtonPanel>
              <GoogleLoginButton closeModal={() => { setIsOpen(false) }} />
            </ModalButtonPanel>
          </Modal>
        </>}
    </NaviBar>
  )
}

export default NavigatorBar