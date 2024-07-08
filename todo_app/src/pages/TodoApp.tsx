import React, { useEffect } from 'react'
import TodoInputSection from '../components/TodoInputSection'
import TodoListSection from '../components/TodoListSection'
import { AlertBanner, NavigatorBar } from '../components'
import axios from 'axios';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '../state/userAtoms';
import useDispatchEvent from '../hooks/useDispatchEvent';
import useEventListener from '../hooks/useEventListener';
import { todoListState } from '../state/todoAtoms';

const TodoApp: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const refreshEvent = useDispatchEvent('refresh');
  const resetList = useResetRecoilState(todoListState);
  const checkSessionAndFetchUser = async () => {
    console.trace('check session and fetch user');
    await axios
      .get('/checksession')
      .then((res) => {
        if (res.data.isLogin) { // session is valid
          setUser({
            email: res.data.email,
            name: res.data.name,
            picture: res.data.picture,
            isLogin: res.data.isLogin
          });
          refreshEvent();
        } else { // session is invalid
          setUser({
            email: '',
            name: '',
            picture: '',
            isLogin: false
          });
          resetList();
        }
      })
      .catch(console.error);
  }
  useEventListener('sign-in-out', checkSessionAndFetchUser);
  // login 동기화
  // useEventListener('storage', checkSessionAndFetchUser, checkSessionAndFetchUser);

  // axios.interceptors.response.use(
  //   (res) => {
  //     console.log(res);
  //     return res
  //   },
  //   (err) => {
  //     if (err.response && err.response.status === 401) {
  //       console.error(err);
  //       localStorage.removeItem('todo-login-key');
  //       window.dispatchEvent(new Event('storage'));
  //     }
  //   }
  // );

  return (
    <div>
      <AlertBanner />
      <NavigatorBar />
      <TodoInputSection />
      <TodoListSection />
    </div>
  )
}

export default TodoApp