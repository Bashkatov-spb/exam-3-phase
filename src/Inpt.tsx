import React from 'react';
import { InputProps } from './types';

interface InptProps extends Omit<InputProps, 'value' | 'onChange'> {
  step: number;
  onHandleChangeStep: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

function Inpt({
  step,
  onHandleChangeStep,
  disabled = false,
  min = 1,
  max = 100,
  ...props
}: InptProps): JSX.Element {
  return (
    <input
      type="number"
      value={step}
      onChange={onHandleChangeStep}
      disabled={disabled}
      min={min}
      max={max}
      step={1}
      aria-label="Шаг счетчика"
      className={`counter-input ${props.className || ''}`}
      {...props}
    />
  );
}

export default Inpt;
