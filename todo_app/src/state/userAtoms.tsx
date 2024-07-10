import { RecoilState, atom } from 'recoil';
import { User } from '../types/components';

const userState: RecoilState<User> = atom<User>({
    key: 'userState',
    default: {
        email: '',
        name: '',
        picture: '',
        isLogin: false
    }
});

export { userState };

