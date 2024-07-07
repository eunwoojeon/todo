import React, { useEffect } from 'react'
import TodoInputSection from '../components/TodoInputSection'
import TodoListSection from '../components/TodoListSection'
import { NavigatorBar } from '../components'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userAtoms';
import { editIdState, todoListState } from '../state/todoAtoms';

const TodoApp: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);

  // auto login/logout ->
  useEffect(() => {
    const handleSessionCheck = async (): Promise<void> => {
      const sessionIsValid = await checkSessionAndFetchUser();
      if (sessionIsValid) { // session is valid(=login)
        await getTodoList(); // refresh todo list
      } else { // session is invalid(=logout)
        setTodoList([]); // initialize todo list
      }
    }
    handleSessionCheck();
    window.addEventListener('storage', handleSessionCheck);

    return () => {
      window.removeEventListener('storage', handleSessionCheck);
    }
  }, []);

  // check session and fetch user request
  const checkSessionAndFetchUser = async (): Promise<boolean> => {
    console.trace('check session and fetch user');
    try {
      const res = await axios.get('/checksession');
      if (res.data.isLogin) { // login check
        setUser({
          email: res.data.email,
          name: res.data.name,
          picture: res.data.picture,
          isLogin: res.data.isLogin
        });
      } else { // logout check
        setUser({
          email: '',
          name: '',
          picture: '',
          isLogin: false
        });
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // todo list request
  const getTodoList = () => {
    console.trace('refresh todo list');
    axios
      .get('http://localhost:4000/todo')
      .then((res) => {
        setEditId('');
        setTodoList(res.data.todoList);
      })
      .catch((err) => {
        console.error(err);
        setTodoList([]);
      });
  }

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
      <NavigatorBar />
      <TodoInputSection />
      <TodoListSection />
    </div>
  )
}

export default TodoApp