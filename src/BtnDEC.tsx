import React from 'react';
import { ButtonProps } from './types';

interface BtnDECProps extends Omit<ButtonProps, 'children'> {
  onHandleMinus: () => void;
}

function BtnDEC({ onHandleMinus, disabled = false, ...props }: BtnDECProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onHandleMinus}
      disabled={disabled}
      aria-label="Уменьшить счетчик"
      className={`counter-btn counter-btn--decrement ${props.className || ''}`}
      {...props}
    >
      -
    </button>
  );
}

export default BtnDEC;
