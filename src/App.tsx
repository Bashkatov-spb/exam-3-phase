import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Inpt from './Inpt';
import Btn from './Btn';

function App(): JSX.Element {
  const [text, setText] = useState('');

  const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const onHandleAddExMark = (): void => {
    setText(`${text}!`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{text}</h3>
        <Inpt text={text} onHandleChangeText={onHandleChangeText} />
        <Btn onHandleAddExMark={onHandleAddExMark} />
        <h3>Parrot</h3>
      </header>
    </div>
  );
}

export default App;
