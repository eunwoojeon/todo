import React from 'react'
import TodoInputSection from './TodoInputSection'
import TodoListSection from './TodoListSection'

const TodoApp: React.FC = () => {

  return (
    <div>
      <TodoInputSection />
      <TodoListSection />
    </div>
  )
}

export default TodoApp

// const addTodo = (): void => {
//   if (!todoTitle.trim()) return; // empty value check
//   console.log(`${todoTitle.trim()}, ${todoDesc.trim()}`);
//   saveTodoToStorage(todoTitle.trim(), todoDesc.trim());
// }

// const saveTodoToStorage = (title: String, desc: String): void => {
//   const todoList = getTodoList();
//   const newTodoList = todoList ? [...todoList, [title, desc]] : [[title, desc]];
//   localStorage.setItem('todo-list', JSON.stringify(newTodoList));
// }

// const getTodoList = () => {
//   return getTodoListFromStorage();
// }

// const getTodoListFromStorage = () => {
//   const todoList = localStorage.getItem('todo-list') ? localStorage.getItem('todo-list') : '[]'; // null check
//   return JSON.parse(todoList as string);
// }