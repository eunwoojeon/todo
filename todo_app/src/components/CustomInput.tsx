import React, { useState } from 'react'
import { RecoilState, SetterOrUpdater, useRecoilState } from 'recoil';
import { CustomInputProps } from '../types/components';

const useInput = (recoilState: RecoilState<string>) => {
  const [value, setValue] = useRecoilState(recoilState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return {value, onChange};
}

const CustomInput: React.FC<CustomInputProps> = ({ text, recoilState }) => {
  const value = useInput(recoilState);

  return (
    <div>
      <span>{text}</span>
      <input type="text" {...value} />
    </div>
  )
}

export default CustomInput