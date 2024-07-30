import axios from 'axios';
import { useRecoilState } from 'recoil';
import useDispatchEvent from '../hooks/useDispatchEvent';
import { todoDescriptionState, todoTitleState } from '../state/todoAtoms';
import { Alert } from '../types/components';
import CustomInput from './CustomInput';
import { AddButton, InputSec } from './TodoInputSection.style';
import { userState } from '../state/userAtoms';

const TodoInputSection: React.FC = () => {
  const [user, SetUser] = useRecoilState(userState);
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoDesc, setTodoDesc] = useRecoilState(todoDescriptionState);
  const refreshEvent = useDispatchEvent('refresh');
  const alertEvent = useDispatchEvent<Alert>('alert', {
    alertIsActive: true,
    alertText: 'You signed out in another tab or your session has expired. Please log in again.'
  });

  // todo save request
  const addTodo = async () => {
    if (!todoTitle || !todoDesc) {
      alert('Title과 Description을 입력해 주세요.');
      return;
    }

    if (!user.isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }

    const body = {
      title: todoTitle,
      desc: todoDesc
    }

    axios
      // .post('http://localhost:4000/todo', body, { params: { case: 'create' }, withCredentials: true })
      .post(process.env.REACT_APP_API_URL + '/todo', body, { params: { case: 'create' }, withCredentials: true })
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
    <InputSec className='input-sec'>
      <CustomInput text={'Title'} recoilState={todoTitleState} />
      <CustomInput text={'Description'} recoilState={todoDescriptionState} />
      <AddButton onClick={addTodo}>Add</AddButton>
    </InputSec>
  )
}

export default TodoInputSection