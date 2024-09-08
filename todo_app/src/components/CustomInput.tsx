import { Buffer } from 'buffer';
import React, { useState, useRef } from 'react';
import useInput from '../hooks/useInput';
import { CustomInputProps } from '../types/components';
import { TodoInput } from './CustomInput.style';

const CustomInput: React.FC<CustomInputProps> = ({ text, recoilState }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const maxByte = 60;
  const [byte, setByte] = useState(0);

  const getByteLengthOfString = (str: string) => {
    const byteLength = Buffer.byteLength(str, 'utf-8');
    if (maxByte >= byteLength) {
      setByte(byteLength);
      return true
    }
    return false;
  }

  const value = useInput(recoilState, getByteLengthOfString);

  const inputClickEvent = () => inputRef.current?.focus();

  return (
    <TodoInput className='custom-input' onClick={inputClickEvent}>
      <input ref={inputRef} type="text" {...value} placeholder={text} />
      <span>{byte}/{maxByte} byte</span>
    </TodoInput>
  )
}

export default CustomInput