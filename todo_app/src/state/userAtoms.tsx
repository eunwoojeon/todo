import { RecoilState, atom } from 'recoil';
import { User } from '../types/components'

export const userState: RecoilState<User> = atom<User>({
    key: 'userState',
    default: {
        email: '',
        name: '',
        picture: '',
        isLogin: false
    }
});

export const emailState: RecoilState<string> = atom<string>({
    key: 'emailState',
    default: ''
});

export const passwordState: RecoilState<string> = atom<string>({
    key: 'passwordState',
    default: ''
});