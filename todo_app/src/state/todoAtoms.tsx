import { RecoilState, atom } from 'recoil';
import { TodoItem } from '../types/components';

export const todoTitleState: RecoilState<string> = atom<string>({
    key: 'todoTitleState',
    default: ''
});

export const todoDescriptionState: RecoilState<string> = atom<string>({
    key: 'todoDescriptionState',
    default: ''
});

export const todoListState: RecoilState<TodoItem[]> = atom<TodoItem[]>({
    key: 'todoListState',
    default: []
});