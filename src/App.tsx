import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BtnINC from './BtnINC';
import BtnDEC from './BtnDEC';
import Inpt from './Inpt';

function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const onHandlePlus = (): void => {
    setCount((prev) => prev + step);
  };

  const onHandleMinus = (): void => {
    setCount((prev) => prev - step);
  };

  const onHandleChangeStep = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStep(Number(e.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{count}</h3>
        <div>
          <BtnINC onHandlePlus={onHandlePlus} />
          <Inpt step={step} onHandleChangeStep={onHandleChangeStep} />
          <BtnDEC onHandleMinus={onHandleMinus} />
        </div>
        <h3>Counter</h3>
      </header>
    </div>
  );
}

export default App;
