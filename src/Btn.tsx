import React from 'react';

function Btn({ onHandleChangeShow }: { onHandleChangeShow: () => void }): JSX.Element {
  return (
    <h4>
      <button type="button" onClick={onHandleChangeShow}>
        Show window
      </button>
    </h4>
  );
}

export default Btn;
