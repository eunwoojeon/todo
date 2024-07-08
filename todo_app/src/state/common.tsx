import { RecoilState, atom } from 'recoil';
import { Alert } from '../types/components';

export const alertState: RecoilState<Alert> = atom<Alert>({
    key: 'alertState',
    default: {
        alertIsActive: false,
        alertText: ''
    }
});