import React, { useEffect } from 'react'
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userAtoms';

const GoogleLoginButton: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          const body = {
            token: credentialResponse.credential
          }
          axios
            .post('http://localhost:4000/user/login/google', body, { withCredentials: true })
            .then((res) => {
              const isLogin = true;
              setUser({isLogin, ...res.data.userData}); // login
            })
            .catch(console.error);
        }}
        onError={() => {
          console.log('react-oauth/google]Login Failed');
        }}
      />;
    </div>
  )
}

export default GoogleLoginButton