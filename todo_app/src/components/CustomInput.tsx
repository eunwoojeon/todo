import React, { useState } from 'react';
import { CustomInputProps } from '../types/components';
import './CustomInput.css';
import useInput from '../hooks/useInput';
import { Buffer } from 'buffer';

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
    <div className='custom-input'>
      <input type="text" {...value} placeholder={text} />
      <span className='byte_displayer'>{byte}/{maxByte} byte</span>
    </div>
  )
}

export default CustomInput