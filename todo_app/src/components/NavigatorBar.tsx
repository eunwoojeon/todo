import { faAdjust, faMoon, faSun, faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { themeState } from '../state/common';
import { userState } from "../state/userAtoms";
import { StyledFontAwesomeIcon } from '../style/common.style';
import { THEME } from '../types/common';
import GoogleLoginButton from './GoogleLoginButton';
import { LoginButton, ModalButton, ModalButtonPanel, NaviBar, XmarkFontAwesomeIcon } from './NavigatorBar.style';

const themes: THEME[] = ['AUTO', 'DARK', 'LIGHT'];
const icons: Record<THEME, IconDefinition> = {
  'AUTO': faAdjust,
  'DARK': faMoon,
  'LIGHT': faSun
};

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
  const user = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const logout = async () => {
    axios
      // .get('http://localhost:4000/user', { withCredentials: true })
      .get(process.env.REACT_APP_API_URL + '/user', { withCredentials: true })
      .then((res) => {
        resetUser();
      })
      // login 동기화
      // .then(() => {
      //   localStorage.removeItem('todo-login-key');
      //   window.dispatchEvent(new Event('storage'));
      // })
      .catch(console.error)
      .finally(() => {
        setIsOpen(false);
        window.location.reload();
      }) // 새로고침
  }

  const deleteUser = async () => {
    if (window.confirm('데이터가 영구 삭제됩니다. 탈퇴하시겠습니까?')) {
      axios
        // .delete('http://localhost:4000/user', { withCredentials: true })
        .delete(process.env.REACT_APP_API_URL + '/user', { withCredentials: true })
        .then((res) => {
          resetUser();
        })
        // login 동기화
        // .then(() => {
        //   localStorage.removeItem('todo-login-key');
        //   window.dispatchEvent(new Event('storage'));
        // })
        .catch(console.error)
        .finally(() => {
          setIsOpen(false);
          window.location.reload();
        }) // 새로고침
    }
  }

  // switching theme
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }

  return (
    <NaviBar>
      <StyledFontAwesomeIcon icon={icons[theme]} onClick={cycleTheme} size="lg" />
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