import { useGoogleLogin } from "@react-oauth/google"
import Modal from 'react-modal';
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import CustomInput from "./CustomInput";
import { emailState, passwordState } from "../state/userAtoms";

const NavigatorBar: React.FC = () => {
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);
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

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse: any) => {
      const body = {
        token: credentialResponse.credential
      }
      axios
        .post('http://localhost:4000/login/google', body)
        .then(console.log)
        .catch(console.error);
    },
    onError: () => console.log('Login Failed')
  });

  return (
    <div>
      NavigatorBar
      <button onClick={openModal}>로그인</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}>
        <h1>Log In</h1>
        <button onClick={closeModal}>닫기</button>
        <button onClick={() => { googleLogin() }}>google</button>
        or
        <CustomInput text={'Email'} recoilState={emailState}/>
        <CustomInput text={'Password'} recoilState={passwordState}/>
        <button onClick={closeModal}>Log In</button>
      </Modal>
    </div>
  )
}

export default NavigatorBar