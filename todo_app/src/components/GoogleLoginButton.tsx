import React, { useEffect } from 'react'
import { useGoogleLogin, GoogleLogin, CredentialResponse } from "@react-oauth/google"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userAtoms';
import useDispatchEvent from '../hooks/useDispatchEvent';

const GoogleLoginButton: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const checkSessionEvent = useDispatchEvent('sign-in-out');

  const request_login = async (token: string) => {
    const body = { token: token };
    axios
      .post('http://localhost:4000/user/login/google', body, { withCredentials: true })
      .then((res) => { setUser({ isLogin: true, ...res.data.userData }) })
      .then((res) => { 
        checkSessionEvent();
      })
      // login 동기화
      // .then(() => {        
      //   localStorage.setItem('todo-login-key', 'true');
      //   window.dispatchEvent(new Event('storage'));
      // })
      .catch(console.error);
  }

  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          // get jwt token
          console.log(credentialResponse);
          // login request
          if (credentialResponse.credential) {
            request_login(credentialResponse.credential);
          } else {
            console.error('GoogleLoginButton] Token is undefined');
          }
        }}
        onError={() => {
          console.error('GoogleLoginButton] @react-oauth/google login failed');
        }}
      />;
    </div>
  )
}

export default GoogleLoginButton