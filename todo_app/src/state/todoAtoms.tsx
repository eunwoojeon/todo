import { RecoilState, atom } from 'recoil';

export const todoTitleState: RecoilState<string> = atom<string>({
    key: 'todoTitleState',
    default: ''
});

export const todoDescriptionState: RecoilState<string> = atom<string>({
    key: 'todoDescriptionState',
    default: ''
});