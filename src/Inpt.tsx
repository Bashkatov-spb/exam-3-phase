import React from 'react';

function Inpt({
  step,
  onHandleChangeStep,
}: {
  step: number;
  onHandleChangeStep: (value: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return <input type="number" value={step} onChange={onHandleChangeStep} />;
}

export default Inpt;
