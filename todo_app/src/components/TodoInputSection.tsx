import React, { useRef, useState } from 'react'
import { TodoInputProps } from '../types/components';
import { RecoilState, useRecoilState } from 'recoil';
import { todoTitleState, todoDescriptionState } from '../state/todoAtoms';
import axios from 'axios';

const useInput = (initialValue: RecoilState<string>) => {
  const [value, setValue] = useRecoilState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    console.log(value);
  }
  return { value, onChange }
}

const TodoInput: React.FC<TodoInputProps> = ({ text, id, placeholder, state }) => {
  const item = useInput(state);

  return (
    <label htmlFor={id}> {text}
      <input className='input-font' id={id} type='text' placeholder={placeholder} {...item} />
    </label>
  )
}

const TodoInputSection: React.FC = () => {
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDesc, setTodoDesc] = useRecoilState(todoDescriptionState);

  const addFunc = () => {
    console.log(`${todoTitle}, ${todoDesc}`);
  }

  return (
    <div>
      <TodoInput text={'할 일'} id={'todo-title'} placeholder={'제목을 입력하세요.'} state={todoTitleState} />
      <TodoInput text={'상세'} id={'todo-description'} placeholder={'할 일을 입력하세요.'} state={todoDescriptionState} />
      <button className='addBtn' onClick={addFunc}>+</button>
    </div>
  )
}

export default TodoInputSection

// const getTest = async () => {
//   await axios.get('http://localhost:4000/user').then(console.log).catch(console.error)
// }