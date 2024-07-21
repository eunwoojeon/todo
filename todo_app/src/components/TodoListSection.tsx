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

  const getDataset = (e: React.SyntheticEvent<EventTarget>) => {
    const currentTarget = e.currentTarget as HTMLButtonElement;
    const parentElement = currentTarget.parentElement as HTMLDivElement;
    const target = parentElement.parentElement as HTMLDivElement;
    const dataset = {
      id: target.dataset.id,
      title: target.dataset.t,
      desc: target.dataset.d
    }

    return dataset;
  }

  // todo delete request
  const deleteTodo = (e: React.SyntheticEvent<EventTarget>) => {
    const { id, ...rest } = getDataset(e);
    axios
      .delete('http://localhost:4000/todo', { params: { todoId: id }, withCredentials: true })
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
    const { id, ...rest } = getDataset(e);
    const body = {
      todoId: id,
      title: editTitle,
      desc: editDesc
    }
    axios
      .post('http://localhost:4000/todo', body, { params: { case: 'update' }, withCredentials: true })
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
    const { id, title, desc } = getDataset(e);
    setEditId(id as string);
    setEditTitle(title as string);
    setEditDesc(desc as string);
  }

  // return to read mode
  const cancelTodo = (e: React.SyntheticEvent<EventTarget>) => {
    setEditId('');
  }

  const checkedEvent = async (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const parentElement = target.parentElement as HTMLDivElement;

    let isCompleted = false;
    if (target.checked) {
      isCompleted = true;
    }

    const body = { 
      todoId: parentElement.dataset.id,
      status: isCompleted
    }
    axios
      .post('http://localhost:4000/todo', body, { params: { case: 'status' }, withCredentials: true })
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

  return (
    <div className='list-sec'>
      <FontAwesomeIcon className='refresh-btn fontawesome' icon={faArrowsRotate} size="lg" onClick={() => { refreshEvent() }} />
      <div>
        {todoList.map((todoItem: TodoItem, index: number) => (
          <div className='item' key={index} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description} data-s={todoItem.status}>
            {editId != todoItem._id ?
              <>
                <input type='checkbox' onChange={checkedEvent} checked={todoItem.status === 'COMPLETE'}/>
                <div className='read'>
                  <span>{todoItem.title}</span>
                  <span>{todoItem.description}</span>
                </div>
                <div key={index}>
                  <button onClick={editTodo}>
                    <FontAwesomeIcon className='fontawesome' icon={faPenToSquare} size="lg" />
                  </button>
                  <button onClick={deleteTodo}>
                    <FontAwesomeIcon className='fontawesome' icon={faTrash} size="lg" />
                  </button>
                </div>
              </> :
              <>
                <div className='edit'>
                  <CustomInput text={todoItem.title} recoilState={editTitleState} />
                  <CustomInput text={todoItem.description} recoilState={editDescriptionState} />
                </div>
                <div key={index}>
                  <button onClick={updateTodo}>
                    <FontAwesomeIcon className='fontawesome' icon={faCircleCheck} size="lg" />
                  </button>
                  <button onClick={cancelTodo}>
                    <FontAwesomeIcon className='fontawesome' icon={faXmark} size="lg" />
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