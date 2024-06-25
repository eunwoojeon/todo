import { RecoilState, atom } from 'recoil';

export const userIdState: RecoilState<string> = atom<string>({
    key: 'userIdState',
    default: ''
});