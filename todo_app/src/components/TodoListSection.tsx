import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { userIdState } from '../state/userAtoms';
import { todoListState } from '../state/todoAtoms';
import { TodoItem } from '../types/components';
import axios from 'axios';

const TodoListSection: React.FC = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const editTodo = () => {

  }

  const getTodoList = () => {
    axios
      .get('http://localhost:4000/todo', { params: { user_id: '6679a48b2804245d4d7c2d1d' } })
      .then((res) => {
        console.log(res)
        setTodoList(res.data[1]);
      })
      .catch(console.error);
  }

  const updateTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const _id = e.target.dataset.id;
    axios
      .put('http://localhost:4000/todo', { params: { _id: _id } })
      .then(console.log)
      .catch(console.error);
  }

  const deleteTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const _id = e.target.dataset.id;
    axios
      .delete('http://localhost:4000/todo', { params: { _id: _id } })
      .then(console.log)
      .catch(console.error);
  }

  return (
    <div>
      <button onClick={getTodoList}>Refresh</button>
      <div>
        {todoList.map((todoItem: TodoItem, index: number) => (
          <div key={index} data-id={todoItem._id}>
            <span>{todoItem.title}</span>
            <span>{todoItem.description}</span>
            <button onClick={editTodo} data-id={todoItem._id}>U</button>
            <button onClick={deleteTodo} data-id={todoItem._id}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoListSection