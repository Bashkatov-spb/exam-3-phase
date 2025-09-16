import React from 'react';
import { ButtonProps } from './types';

interface BtnINCProps extends Omit<ButtonProps, 'children'> {
  onHandlePlus: () => void;
}

function BtnINC({ onHandlePlus, disabled = false, ...props }: BtnINCProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onHandlePlus}
      disabled={disabled}
      aria-label="Увеличить счетчик"
      className={`counter-btn counter-btn--increment ${props.className || ''}`}
      {...props}
    >
      +
    </button>
  );
}

export default BtnINC;
