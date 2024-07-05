import React, { useEffect } from 'react'
import TodoInputSection from '../components/TodoInputSection'
import TodoListSection from '../components/TodoListSection'
import { NavigatorBar } from '../components'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../state/userAtoms';

const TodoApp: React.FC = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    checkLogin();
    console.log(user);
  }, []);

  const checkLogin = async () => {
    await axios
      .get('/checksession')
      .then((res) => {
        console.log(res);
        if (res.data.isLogin) {
          const user = {
            email: res.data.email,
            name: res.data.name,
            picture: res.data.picture,
            isLogin: res.data.isLogin
          };
          setUser(user);
        } else {
          const user = {
            email: '',
            name: '',
            picture: '',
            isLogin: false
          };
          setUser(user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <NavigatorBar />
      <TodoInputSection />
      <TodoListSection />
    </div>
  )
}

export default TodoApp

// const addTodo = (): void => {
//   if (!todoTitle.trim()) return; // empty value check
//   console.log(`${todoTitle.trim()}, ${todoDesc.trim()}`);
//   saveTodoToStorage(todoTitle.trim(), todoDesc.trim());
// }

// const saveTodoToStorage = (title: String, desc: String): void => {
//   const todoList = getTodoList();
//   const newTodoList = todoList ? [...todoList, [title, desc]] : [[title, desc]];
//   localStorage.setItem('todo-list', JSON.stringify(newTodoList));
// }

// const getTodoList = () => {
//   return getTodoListFromStorage();
// }

// const getTodoListFromStorage = () => {
//   const todoList = localStorage.getItem('todo-list') ? localStorage.getItem('todo-list') : '[]'; // null check
//   return JSON.parse(todoList as string);
// }