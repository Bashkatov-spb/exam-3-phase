import React from 'react';

function Btn({ onHandleAddExMark }: { onHandleAddExMark: () => void }): JSX.Element {
  return (
    <h4>
      <button type="button" onClick={onHandleAddExMark}>
        Add !
      </button>
    </h4>
  );
}

export default Btn;
