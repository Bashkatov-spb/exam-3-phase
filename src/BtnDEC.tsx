import React from 'react';

function BtnDEC({ onHandleMinus }: { onHandleMinus: () => void }): JSX.Element {
  return (
    <button type="button" onClick={onHandleMinus}>
      -
    </button>
  );
}

export default BtnDEC;
