import React from 'react';
import { ButtonProps } from './types';

interface BtnResetProps extends Omit<ButtonProps, 'children'> {
  onHandleReset: () => void;
}

function BtnReset({ onHandleReset, disabled = false, ...props }: BtnResetProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onHandleReset}
      disabled={disabled}
      aria-label="Сбросить счетчик"
      className={`counter-btn counter-btn--reset ${props.className || ''}`}
      {...props}
    >
      Сброс
    </button>
  );
}

export default BtnReset;
