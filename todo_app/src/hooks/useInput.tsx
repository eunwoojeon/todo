import { RecoilState, useRecoilState } from 'recoil';

export const useInput = (initialValue: RecoilState<string>) => {
  const [value, setValue] = useRecoilState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return { value, onChange }
}