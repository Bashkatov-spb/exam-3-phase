import React from 'react';

function Inpt({
  text,
  onHandleChangeText,
}: {
  text: string;
  onHandleChangeText: (value: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  return <input type="text" value={text} onChange={onHandleChangeText} />;
}

export default Inpt;
