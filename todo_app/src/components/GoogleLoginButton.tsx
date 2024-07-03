import React, { useEffect } from 'react'
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google"

const GoogleLoginButton: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse)
  });

  return (
    <div>
      <button onClick={() => login()}>google로그인</button>
    </div>
  )
}

export default GoogleLoginButton