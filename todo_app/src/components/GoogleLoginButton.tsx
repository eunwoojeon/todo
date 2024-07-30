import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import useDispatchEvent from '../hooks/useDispatchEvent';
import { userState } from '../state/userAtoms';
import { GoogleLoginButtonProps } from "../types/components";

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ closeModal }) => {
  const setUser = useSetRecoilState(userState);
  const checkSessionEvent = useDispatchEvent('sign-in-out');

  const request_login = async (token: string) => {
    const body = { token: token };
    axios
      // .post('http://localhost:4000/user', body, { withCredentials: true })
      .post(process.env.REACT_APP_API_URL + '/user', body, { withCredentials: true })
      .then((res) => {
        setUser({ ...res.data.userData });
        checkSessionEvent();
      })
      // login 동기화
      // .then(() => {        
      //   localStorage.setItem('todo-login-key', 'true');
      //   window.dispatchEvent(new Event('storage'));
      // })
      .catch(console.error)
      .finally(closeModal());
  }

  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          // 1 .get jwt token(credentialResponse) from google
          // 2. login request
          if (credentialResponse.credential) {
            request_login(credentialResponse.credential);
          } else {
            console.error('GoogleLoginButton] Token is undefined');
          }
        }}
        onError={() => {
          console.error('GoogleLoginButton] @react-oauth/google login failed');
        }}
      />
    </div>
  )
}

export default GoogleLoginButton