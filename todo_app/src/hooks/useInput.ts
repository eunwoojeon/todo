import { RecoilState, useRecoilState } from 'recoil';

const useInput = (recoilState: RecoilState<string>, validator: Function | undefined = undefined) => {
  const [value, setValue] = useRecoilState(recoilState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let willUpdate = true;
    if (typeof validator === 'function') willUpdate = validator(e.target.value);
    if (typeof validator === 'undefined') willUpdate = true;
    if (willUpdate) setValue(e.target.value);
  }

  return { value, onChange };
}

export default useInput;