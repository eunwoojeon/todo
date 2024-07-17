import axios from 'axios';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { AlertBanner, NavigatorBar, TodoInputSection, TodoListSection } from '../components';
import useDispatchEvent from '../hooks/useDispatchEvent';
import useEventListener from '../hooks/useEventListener';
import { todoListState } from '../state/todoAtoms';
import { userState } from '../state/userAtoms';
import './TodoApp.css';

const TodoApp: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const refreshEvent = useDispatchEvent('refresh');
  const resetList = useResetRecoilState(todoListState);
  const checkSessionAndFetchUser = async () => {
    console.trace('check session and fetch user');
    await axios
      .get('http://localhost:4000/checksession', { withCredentials: true })
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
  useEventListener('sign-in-out', checkSessionAndFetchUser, checkSessionAndFetchUser);

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
    <div className='todoApp'>
      <AlertBanner />
      <NavigatorBar />
      <div className='title title-font'>To-Do List</div>
      <div className='main'>
        <TodoInputSection />
        <hr style={{alignSelf: 'stretch', width: '100%', border: 'solid 1px var(--list-bg-color)'}}/>
        <TodoListSection />
      </div>
    </div>
  )
}

export default TodoApp