import { RecoilState, atom } from 'recoil';
import { TodoItem } from '../types/components';

const todoTitleState: RecoilState<string> = atom<string>({
    key: 'todoTitleState',
    default: ''
});

const todoDescriptionState: RecoilState<string> = atom<string>({
    key: 'todoDescriptionState',
    default: ''
});

const todoListState: RecoilState<TodoItem[]> = atom<TodoItem[]>({
    key: 'todoListState',
    default: []
});

const editIdState: RecoilState<string> = atom<string>({
    key: 'editIdState',
    default: ''
});

const editTitleState: RecoilState<string> = atom<string>({
    key: 'editTitleState',
    default: ''
});

const editDescriptionState: RecoilState<string> = atom<string>({
    key: 'editDescriptionState',
    default: ''
});

export { editDescriptionState, editIdState, editTitleState, todoDescriptionState, todoListState, todoTitleState };
