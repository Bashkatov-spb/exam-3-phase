import React from 'react';

function BtnINC({ onHandlePlus }: { onHandlePlus: () => void }): JSX.Element {
  return (
    <button type="button" onClick={onHandlePlus}>
      +
    </button>
  );
}

export default BtnINC;
