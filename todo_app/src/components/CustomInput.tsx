import React from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { CustomInputProps } from '../types/components';
import styles from './CustomInput.module.css';

const useInput = (recoilState: RecoilState<string>) => {
  const [value, setValue] = useRecoilState(recoilState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return { value, onChange };
}

const CustomInput: React.FC<CustomInputProps> = ({ text, recoilState }) => {
  const value = useInput(recoilState);

  return (
    <div className={styles.customInput}>
      <span>{text}</span>
      <input type="text" {...value} />
    </div>
  )
}

export default CustomInput