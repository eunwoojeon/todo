import axios from 'axios';
import React from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { NavigatorBar, TodoInputSection, TodoListSection } from '../components';
import useDarkMode from '../hooks/useDarkMode';
import useDispatchEvent from '../hooks/useDispatchEvent';
import useEventListener from '../hooks/useEventListener';
import { themeState } from '../state/common';
import { todoListState } from '../state/todoAtoms';
import { userState } from '../state/userAtoms';
import GlobalStyles from '../style/globalStyles';
import themes from '../style/themes';
import { Div, Main, Title } from './TodoApp.style';

const TodoApp: React.FC = () => {
  const setUser = useSetRecoilState(userState);
  const refreshEvent = useDispatchEvent('refresh');
  const resetList = useResetRecoilState(todoListState);
  const checkSessionAndFetchUser = async () => {
    await axios
      // .get('http://localhost:4000/checksession', { withCredentials: true })
      .get(process.env.REACT_APP_API_URL + '/checksession', { withCredentials: true })
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

  // appling theme
  const isDarkMode = useDarkMode();
  const theme = useRecoilValue(themeState);
  const currentTheme = theme === 'AUTO' ? (isDarkMode ? themes['DARK'] : themes['LIGHT']) : themes[theme];

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Div className='todoApp'>
        {/* <AlertBanner /> */}
        <NavigatorBar />
        <Title className='title-font'>To-Do List</Title>
        <Main>
          <TodoInputSection />
          <hr />
          <TodoListSection />
        </Main>
      </Div>
    </ThemeProvider>
  )
}

export default TodoApp