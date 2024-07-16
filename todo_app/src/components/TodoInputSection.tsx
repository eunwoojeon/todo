import axios from 'axios';
import { useRecoilState } from 'recoil';
import useDispatchEvent from '../hooks/useDispatchEvent';
import { todoDescriptionState, todoTitleState } from '../state/todoAtoms';
import { Alert } from '../types/components';
import CustomInput from './CustomInput';
import './TodoInputSection.css';

const TodoInputSection: React.FC = () => {
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDesc, setTodoDesc] = useRecoilState(todoDescriptionState);
  const refreshEvent = useDispatchEvent('refresh');
  const alertEvent = useDispatchEvent<Alert>('alert', {
    alertIsActive: true,
    alertText: 'You signed out in another tab or your session has expired. Please log in again.'
  });

  // todo save request
  const addTodo = async () => {
    const body = {
      title: todoTitle,
      desc: todoDesc
    }

    axios
      .post('http://localhost:4000/todo', body, { params: { write: 'create' }, withCredentials: true })
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
    <div className='input-sec'>
      <CustomInput text={'제목'} recoilState={todoTitleState} />
      <CustomInput text={'할일'} recoilState={todoDescriptionState} />
      <button className='addBtn' onClick={addTodo}>+</button>
    </div>
  )
}

export default TodoInputSection