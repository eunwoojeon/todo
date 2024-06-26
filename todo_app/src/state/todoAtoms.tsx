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

export const editIdState: RecoilState<string> = atom<string>({
    key: 'editIdState',
    default: ''
});

export const editTitleState: RecoilState<string> = atom<string>({
    key: 'editTitleState',
    default: ''
});

export const editDescriptionState: RecoilState<string> = atom<string>({
    key: 'editDescriptionState',
    default: ''
});