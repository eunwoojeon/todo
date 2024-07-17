import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import useDispatchEvent from '../hooks/useDispatchEvent';
import useEventListener from '../hooks/useEventListener';
import { editDescriptionState, editIdState, editTitleState, todoListState } from '../state/todoAtoms';
import { Alert, TodoItem } from '../types/components';
import CustomInput from './CustomInput';
import './TodoListSection.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    if (!(e.currentTarget.parentElement instanceof HTMLDivElement)) return;
    const todoId = e.currentTarget.parentElement.dataset.id;
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
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    if (!(e.currentTarget.parentElement instanceof HTMLDivElement)) return;
    const todoId = e.currentTarget.parentElement.dataset.id;
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
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    if (!(e.currentTarget.parentElement instanceof HTMLDivElement)) return;
    setEditId(e.currentTarget.parentElement.dataset.id as string);
    setEditTitle(e.currentTarget.parentElement.dataset.t as string);
    setEditDesc(e.currentTarget.parentElement.dataset.d as string);
  }

  // return to read mode
  const cancelTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    if (!(e.currentTarget.parentElement instanceof HTMLDivElement)) return;
    setEditId('');
  }

  return (
    <div className='list-sec'>
      <FontAwesomeIcon className='refresh-btn' icon={faArrowsRotate} size="lg" onClick={() => { refreshEvent() }} style={{ color: 'var(--fontawesome)' }} />
      <div>
        {todoList.map((todoItem: TodoItem, index: number) => (
          <div className='item' key={index}>
            {editId != todoItem._id ?
              <>
                <div className='read'>
                  <span>{todoItem.title}</span>
                  <span>{todoItem.description}</span>
                </div>
                <div key={index} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description}>
                  <button onClick={editTodo}>
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: 'var(--fontawesome)' }} />
                  </button>
                  <button onClick={deleteTodo}>
                    <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: 'var(--fontawesome)' }} />
                  </button>
                </div>
              </> :
              <>
                <div className='edit'>
                  <CustomInput text={todoItem.title} recoilState={editTitleState} />
                  <CustomInput text={todoItem.description} recoilState={editDescriptionState} />
                </div>
                <div key={index} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description}>
                  <button onClick={updateTodo}>
                    <FontAwesomeIcon icon={faCircleCheck} size="lg" style={{ color: 'var(--fontawesome)' }} />
                  </button>
                  <button onClick={cancelTodo}>
                    <FontAwesomeIcon icon={faXmark} size="lg" style={{ color: 'var(--fontawesome)' }} />
                  </button>
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