import { useRecoilState } from 'recoil';
import { todoTitleState, todoDescriptionState, todoListState, editIdState, editTitleState, editDescriptionState } from '../state/todoAtoms';
import axios from 'axios';
import CustomInput from './CustomInput';
import useDispatchEvent from '../hooks/useDispatchEvent';

// 개발 방향 : todo item 입력 및 추가 기능만 구현
const TodoInputSection: React.FC = () => {
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDesc, setTodoDesc] = useRecoilState(todoDescriptionState);
  const refreshEvent = useDispatchEvent('refresh');
  const alertEvent = useDispatchEvent('alert');

  // todo save request
  const addTodo = async () => {
    const body = {
      title: todoTitle,
      desc: todoDesc
    }

    axios
      .post('http://localhost:4000/todo', body, { params: { write: 'create' } })
      .then((res) => {
        refreshEvent(); // refresh list
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alertEvent();
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setTodoTitle('');
        setTodoDesc('');
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