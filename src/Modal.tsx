import React from 'react';

function Modal({ onHandleChangeShow }: { onHandleChangeShow: () => void }): JSX.Element {
  return (
    <div>
      <h3>Our modal</h3>
      <button type="button" onClick={onHandleChangeShow}>
        Close window
      </button>
    </div>
  );
}

export default Modal;
