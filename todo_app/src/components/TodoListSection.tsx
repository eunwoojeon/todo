import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { editDescriptionState, editIdState, editTitleState, todoListState } from '../state/todoAtoms';
import { TodoItem } from '../types/components';
import axios from 'axios';
import { userState } from '../state/userAtoms';

const TodoListSection: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editTitle, setEditTitle] = useRecoilState(editTitleState);
  const [editDesc, setEditDesc] = useRecoilState(editDescriptionState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    getTodoList();
  }, [user]);

  const getTodoList = () => {
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

  const deleteTodo = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const todoId = e.target.dataset.id;
    axios
      .delete('http://localhost:4000/todo', { params: { todoId: todoId } })
      .then((res) => {
        // console.log(res);
        getTodoList();
      })
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
    const todoId = e.target.dataset.id;
    const body = {
      todoId: todoId,
      title: editTitle,
      desc: editDesc
    }
    axios
      .post('http://localhost:4000/todo', body, { params: { write: 'update' } })
      .then((res) => {
        // console.log(res);
        getTodoList();
        setEditId('');
      })
      .catch(console.error);
  }

  useEffect(() => {
    
  });

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