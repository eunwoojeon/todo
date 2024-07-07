import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { editDescriptionState, editIdState, editTitleState, todoListState } from '../state/todoAtoms';
import { TodoItem } from '../types/components';
import axios from 'axios';
import { userState } from '../state/userAtoms';
import CustomInput from './CustomInput';

const TodoListSection: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editTitle, setEditTitle] = useRecoilState(editTitleState);
  const [editDesc, setEditDesc] = useRecoilState(editDescriptionState);

  const todoListFetchEvent = () => {
    window.dispatchEvent(new Event('storage'));
  }

  // todo delete function
  const deleteTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (!(e.target.parentElement instanceof HTMLDivElement)) return;
    const todoId = e.target.parentElement.dataset.id;
    axios
      .delete('http://localhost:4000/todo', { params: { todoId: todoId } })
      .then((res) => {
        todoListFetchEvent();
      })
      .catch(console.error);
  }

  // todo update function
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
      .post('http://localhost:4000/todo', body, { params: { write: 'update' } })
      .then((res) => {
        todoListFetchEvent();
      })
      .catch(console.error);
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
    <div>
      <button onClick={todoListFetchEvent}>Refresh</button>
      <div>
        {todoList.map((todoItem: TodoItem, index: number) => (
          <div key={index} data-id={todoItem._id} data-t={todoItem.title} data-d={todoItem.description}>
            {editId != todoItem._id ?
              <>
                <span>{todoItem.title}</span>
                <span>{todoItem.description}</span>
                <button onClick={editTodo}>U</button>
                <button onClick={deleteTodo}>X</button>
              </> :
              <>
                <CustomInput text={todoItem.title} recoilState={editTitleState} />
                <CustomInput text={todoItem.description} recoilState={editDescriptionState} />
                <button onClick={updateTodo}>완료</button>
                <button onClick={cancelTodo}>취소</button>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoListSection