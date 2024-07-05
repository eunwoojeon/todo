import { useRecoilState } from 'recoil';
import { todoTitleState, todoDescriptionState, todoListState, editIdState } from '../state/todoAtoms';
import axios from 'axios';
import CustomInput from './CustomInput';
import { useEffect } from 'react';
import { userState } from '../state/userAtoms';

const TodoInputSection: React.FC = () => {
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDesc, setTodoDesc] = useRecoilState(todoDescriptionState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);

  const addTodo = async () => {
    const body = {
      title: todoTitle,
      desc: todoDesc
    }
    console.log(body);
    axios
      .post('http://localhost:4000/todo', body, { params: { write: 'create' } })
      .then((res) => {
        console.log(res);
        getTodoList();
        setTodoTitle('');
        setTodoDesc('');
      })
      .catch(console.error);
  }

  const getTodoList = async () => {
    await axios
      .get('http://localhost:4000/todo')
      .then((res) => {
        console.log(res)
        setEditId('');
        setTodoList(res.data.todoList);
      })
      .catch((err) => {
        console.error(err);
        setTodoList([]);
      });
  }

  return (
    <div>
      <CustomInput text={'제목'} recoilState={todoTitleState} />
      <CustomInput text={'할일'} recoilState={todoDescriptionState} />
      <button className='addBtn' onClick={addTodo}>+</button>
    </div>
  )
}

export default TodoInputSection