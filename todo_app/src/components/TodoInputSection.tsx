import React, { useRef, useState } from 'react'
import { TodoInputProps, TodoInputSectionProps } from '../types/components';
import { RecoilState, useRecoilState } from 'recoil';
import { todoTitleState, todoDescriptionState, todoListState, editIdState } from '../state/todoAtoms';
import { useInput } from '../hooks/useInput';
import axios from 'axios';

const TodoInput: React.FC<TodoInputProps> = ({ text, id, placeholder, state }) => {
  const onChangeEvent = useInput(state);
  return (
    <label htmlFor={id}> {text}
      <input className='input-font' id={id} type='text' placeholder={placeholder} {...onChangeEvent} />
    </label>
  )
}

const TodoInputSection: React.FC = () => {
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDescription, setTodoDescription] = useRecoilState(todoDescriptionState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);

  const addTodo = async () => {
    const body = {
      user_id: '6679a48b2804245d4d7c2d1d',
      title: todoTitle,
      desc: todoDescription
    }
    axios
      .post('http://localhost:4000/todo', body)
      .then((res) => {
        console.log(res);
        getTodoList();
        setTodoTitle('');
        setTodoDescription('');
      })
      .catch(console.error);
  }

  const getTodoList = async () => {
    await axios
      .get('http://localhost:4000/todo', { params: { user_id: '6679a48b2804245d4d7c2d1d' } })
      .then((res) => {
        console.log(res)
        setEditId('');
        setTodoList(res.data[1]);
      })
      .catch(console.error);
  }

  return (
    <div>
      <TodoInput text={'할 일'} id={'todo-title'} placeholder={'제목을 입력하세요.'} state={todoTitleState} />
      <TodoInput text={'상세'} id={'todo-description'} placeholder={'할 일을 입력하세요.'} state={todoDescriptionState} />
      <button className='addBtn' onClick={addTodo}>+</button>
    </div>
  )
}

export default TodoInputSection