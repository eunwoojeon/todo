import { useRecoilState } from 'recoil';
import { todoTitleState, todoDescriptionState, todoListState, editIdState } from '../state/todoAtoms';
import axios from 'axios';

const TodoInputSection: React.FC = () => {
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDesc, setTodoDesc] = useRecoilState(todoDescriptionState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editId, setEditId] = useRecoilState(editIdState);

  const addTodo = async () => {
    const body = {
      user_id: '6679a48b2804245d4d7c2d1d',
      title: todoTitle,
      desc: todoDesc
    }
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
      <label htmlFor='todo-title'> 할 일
        <input id='todo-title' className='input-font' type='text' placeholder={'제목을 입력하세요.'} value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
      </label>
      <label htmlFor='todo-desc'>
        <input id='todo-desc' className='input-font' type='text' placeholder={'할 일을 입력하세요.'} value={todoDesc} onChange={e => setTodoDesc(e.target.value)} />
      </label>
      <button className='addBtn' onClick={addTodo}>+</button>
    </div>
  )
}

export default TodoInputSection