import React from 'react'
import InputBox from './TodoInputSection'
import ToDoList from './TodoListSection'

const TodoApp: React.FC = () => {
  return (
    <div>
      <InputBox />
      <ToDoList />
    </div>
  )
}

export default TodoApp