import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Btn from './Btn';
import Modal from './Modal';

function App(): JSX.Element {
  const [show, setShow] = useState(false);

  const onHandleChangeShow = (): void => {
    setShow((prev) => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {show && <Modal onHandleChangeShow={onHandleChangeShow} />}
        {!show && <Btn onHandleChangeShow={onHandleChangeShow} />}
        <h3>Modal window</h3>
      </header>
    </div>
  );
}

export default App;
