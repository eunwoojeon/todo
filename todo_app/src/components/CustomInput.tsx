import React from 'react';
import { CustomInputProps } from '../types/components';
import './CustomInput.css';
import useInput from '../hooks/useInput';
import { Buffer } from 'buffer';

const CustomInput: React.FC<CustomInputProps> = ({ text, recoilState }) => {
  const getByteLengthOfString = (str: string) => {
    const byteLength = Buffer.byteLength(str, 'utf-8');
    if (60 >= byteLength) return true;
    return false;
  }
  const value = useInput(recoilState, getByteLengthOfString);

  return (
    <div className='custom-input'>
      <input type="text" {...value} placeholder={text}/>
    </div>
  )
}

export default CustomInput