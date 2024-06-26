import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userIdState } from '../state/userAtoms';
import { editDescriptionState, editIdState, editTitleState, todoListState } from '../state/todoAtoms';
import { TodoItem } from '../types/components';
import { useInput } from '../hooks/useInput';
import axios from 'axios';
import { todo } from 'node:test';

const TodoListSection: React.FC = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editTitle, setEditTitle] = useRecoilState(editTitleState);
  const [editDesc, setEditDesc] = useRecoilState(editDescriptionState);

  const getTodoList = () => {
    axios
      .get('http://localhost:4000/todo', { params: { user_id: '6679a48b2804245d4d7c2d1d' } })
      .then((res) => {
        console.log(res)
        setEditId('');
        setTodoList(res.data[1]);
      })
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

  const editTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    setEditId(e.target.dataset.id as string);
    setEditTitle(e.target.dataset.t as string);
    setEditDesc(e.target.dataset.d as string);
  }

  const updateTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const _id = e.target.dataset.id;
    const body = {
      _id: _id,
      title: editTitle,
      desc: editDesc
    }
    axios
      .post('http://localhost:4000/todo/edit', body)
      .then((res) => {
        console.log(res);
        getTodoList();
        setEditId('');
      })
      .catch(console.error);
  }

  return (
    <div>
      <button onClick={getTodoList}>Refresh</button>
      <div>
        {todoList.map((todoItem: TodoItem, index: number) => (
          <div key={index} data-id={todoItem._id}>
            {editId != todoItem._id ?
              <>
                <span>{todoItem.title}</span>
                <span>{todoItem.description}</span>
                <button onClick={editTodo} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description}>U</button>
                <button onClick={deleteTodo} data-id={todoItem._id}>X</button>
              </> :
              <>
                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <input type="text" value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                <button onClick={updateTodo} data-id={todoItem._id}>완료</button>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoListSection