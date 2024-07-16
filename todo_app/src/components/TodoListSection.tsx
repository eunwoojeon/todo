import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import useDispatchEvent from '../hooks/useDispatchEvent';
import useEventListener from '../hooks/useEventListener';
import { editDescriptionState, editIdState, editTitleState, todoListState } from '../state/todoAtoms';
import { Alert, TodoItem } from '../types/components';
import CustomInput from './CustomInput';
import './TodoListSection.css'

const TodoListSection: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const alertEvent = useDispatchEvent<Alert>('alert', {
    alertIsActive: true,
    alertText: 'You signed out in another tab or your session has expired. Please log in again.'
  });
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editTitle, setEditTitle] = useRecoilState(editTitleState);
  const [editDesc, setEditDesc] = useRecoilState(editDescriptionState);
  useEventListener('refresh', async () => {
    console.trace('refresh todo list');
    axios
      .get('http://localhost:4000/todo', { withCredentials: true })
      .then((res) => {
        setEditId('');
        setTodoList(res.data.todoList);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setTodoList(err.response.data.todoList);
          alertEvent();
        } else {
          console.error(err);
        }
      });
  });
  const refreshEvent = useDispatchEvent('refresh');

  // todo delete request
  const deleteTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLDivElement)) return;
    const todoId = e.target.parentElement.dataset.id;
    axios
      .delete('http://localhost:4000/todo', { params: { todoId: todoId }, withCredentials: true })
      .then((res) => {
        refreshEvent(); // refresh list
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alertEvent();
        } else {
          console.error(err);
        }
      });
  }

  // todo update request
  const updateTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLDivElement)) return;
    const todoId = e.target.parentElement.dataset.id;
    const body = {
      todoId: todoId,
      title: editTitle,
      desc: editDesc
    }
    axios
      .post('http://localhost:4000/todo', body, { params: { write: 'update' }, withCredentials: true })
      .then((res) => {
        refreshEvent(); // refresh list
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alertEvent();
        } else {
          console.error(err);
        }
      });
  }

  // change to edit mode
  const editTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLDivElement)) return;
    setEditId(e.target.parentElement.dataset.id as string);
    setEditTitle(e.target.parentElement.dataset.t as string);
    setEditDesc(e.target.parentElement.dataset.d as string);
  }

  // return to read mode
  const cancelTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLDivElement)) return;
    setEditId('');
  }

  return (
    <div className='list-sec'>
      <button onClick={() => { refreshEvent() }}>Refresh</button>
      <div>
        {todoList.map((todoItem: TodoItem, index: number) => (
          <div className='item'>
            {editId != todoItem._id ?
              <>
                <div className='read'>
                  <span>{todoItem.title}</span>
                  <span>{todoItem.description}</span>
                </div>
                <div key={index} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description}>
                  <button onClick={editTodo}>U</button>
                  <button onClick={deleteTodo}>X</button>
                </div>
              </> :
              <>
                <div className='edit'>
                  <CustomInput text={todoItem.title} recoilState={editTitleState} />
                  <CustomInput text={todoItem.description} recoilState={editDescriptionState} />
                </div>
                <div key={index} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description}>
                  <button onClick={updateTodo}>완료</button>
                  <button onClick={cancelTodo}>취소</button>
                </div>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoListSection