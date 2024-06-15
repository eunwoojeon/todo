import React, { useRef, useState } from 'react'


type TodoInputProps = {
  text: string;
  id: string;
  placeholder: string;
}

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  return { value, onChange }
}

const TodoInput: React.FC<TodoInputProps> = ({ text, id, placeholder }) => {
  const item = useInput('');

  return (
    <label htmlFor={id}> {text}
      <input id={id} type='text' placeholder={placeholder} {...item}/>
    </label>
  )
}

const TodoInputSection: React.FC = () => {
  const addFunc = () => {
    console.log("Click!");
  }

  return (
    <div>
      <TodoInput text={'할 일'} id={'todo-title'} placeholder={'제목을 입력하세요.'} />
      <TodoInput text={'상세'} id={'todo-description'} placeholder={'할 일을 입력하세요.'} />
      <button className='addBtn' onClick={addFunc}>+</button>
    </div>
  )
}

export default TodoInputSection