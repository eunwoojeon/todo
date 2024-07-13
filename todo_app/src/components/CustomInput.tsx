import React from 'react';
import { CustomInputProps } from '../types/components';
import styles from './CustomInput.module.css';
import useInput from '../hooks/useInput';
import { Buffer } from 'buffer';

const CustomInput: React.FC<CustomInputProps> = ({ text, recoilState }) => {
  const getByteLengthOfString = (str: string) => {
    const byteLength = Buffer.byteLength(str, 'utf-8');
    if (10 >= byteLength) return true;
    return false;
  }
  const value = useInput(recoilState, getByteLengthOfString);
  
  return (
    <div className={styles.customInput}>
      <span>{text}</span>
      <input type="text" {...value} />
    </div>
  )
}

export default CustomInput