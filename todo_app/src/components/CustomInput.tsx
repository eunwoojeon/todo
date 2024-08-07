import { Buffer } from 'buffer';
import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import { CustomInputProps } from '../types/components';
import { TodoInput } from './CustomInput.style';

const CustomInput: React.FC<CustomInputProps> = ({ text, recoilState }) => {
  const maxByte = 60;
  const [byte, setByte] = useState(() => {
    if (text !== '제목' && text !== '할일') {
      return Buffer.byteLength(text, 'utf-8');
    }
    return 0;
  });

  const getByteLengthOfString = (str: string) => {
    const byteLength = Buffer.byteLength(str, 'utf-8');
    if (maxByte >= byteLength) {
      setByte(byteLength);
      return true
    }
    return false;
  }

  const value = useInput(recoilState, getByteLengthOfString);

  return (
    <TodoInput className='custom-input'>
      <input type="text" {...value} placeholder={text} />
      <span>{byte}/{maxByte} byte</span>
    </TodoInput>
  )
}

export default CustomInput