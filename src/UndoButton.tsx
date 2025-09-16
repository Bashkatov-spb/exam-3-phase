import React from 'react';
import { ButtonProps } from './types';

interface UndoButtonProps extends Omit<ButtonProps, 'children'> {
  onHandleUndo: () => void;
  canUndo: boolean;
}

function UndoButton({ 
  onHandleUndo, 
  canUndo, 
  disabled = false, 
  ...props 
}: UndoButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onHandleUndo}
      disabled={disabled || !canUndo}
      aria-label="Отменить последнюю операцию"
      className={`counter-btn counter-btn--undo ${props.className || ''}`}
      {...props}
    >
      ↶ Отмена
    </button>
  );
}

export default UndoButton;
