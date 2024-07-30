import { RecoilState, RecoilValueReadOnly, atom, selector } from 'recoil';
import { THEME } from '../types/common';
import { Alert } from '../types/components';

export const alertState: RecoilState<Alert> = atom<Alert>({
  key: 'alertState',
  default: {
    alertIsActive: false,
    alertText: ''
  }
});

const themeInitialValueSelector: RecoilValueReadOnly<THEME> = selector<THEME>({
  key: 'themeInitialValueSelector',
  get: async () => {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'AUTO' || storedTheme === 'DARK' || storedTheme === 'LIGHT') {
      return storedTheme;
    }
    return 'AUTO';
  }
});

export const themeState: RecoilState<THEME> = atom<THEME>({
  key: 'themeState',
  default: themeInitialValueSelector
});