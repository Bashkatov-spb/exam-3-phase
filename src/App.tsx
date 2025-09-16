import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import BtnINC from './BtnINC';
import BtnDEC from './BtnDEC';
import BtnReset from './BtnReset';
import UndoButton from './UndoButton';
import HistoryPanel from './HistoryPanel';
import Inpt from './Inpt';
import { CounterState, HistoryEntry, HistoryState } from './types';

function App(): JSX.Element {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isValidStep, setIsValidStep] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const validateStep = useCallback((value: number): boolean => {
    return value >= 1 && value <= 100 && Number.isInteger(value);
  }, []);

  const addToHistory = useCallback((operation: 'increment' | 'decrement' | 'reset', step: number, result: number): void => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      operation,
      step,
      result,
      timestamp: Date.now()
    };
    setHistory(prev => [...prev, newEntry]);
  }, []);

  const undoLastOperation = useCallback((): void => {
    if (history.length === 0) return;
    
    const lastEntry = history[history.length - 1];
    setCount(lastEntry.result);
    setHistory(prev => prev.slice(0, -1));
  }, [history]);

  const clearHistory = useCallback((): void => {
    setHistory([]);
  }, []);

  const toggleHistoryVisibility = useCallback((): void => {
    setIsHistoryVisible(prev => !prev);
  }, []);

  const onHandlePlus = useCallback((): void => {
    if (isValidStep) {
      const newCount = count + step;
      setCount(newCount);
      addToHistory('increment', step, newCount);
    }
  }, [step, isValidStep, count, addToHistory]);

  const onHandleMinus = useCallback((): void => {
    if (isValidStep) {
      const newCount = count - step;
      setCount(newCount);
      addToHistory('decrement', step, newCount);
    }
  }, [step, isValidStep, count, addToHistory]);

  const onHandleReset = useCallback((): void => {
    setCount(0);
    addToHistory('reset', 0, 0);
  }, [addToHistory]);

  const onHandleChangeStep = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const newStep = Number(e.target.value);
    const isValid = validateStep(newStep);
    
    setIsValidStep(isValid);
    if (isValid) {
      setStep(newStep);
    }
  }, [validateStep]);

  const counterState: CounterState = {
    count,
    step,
    isValidStep,
  };

  const historyState: HistoryState = {
    entries: history,
    canUndo: history.length > 0,
    isHistoryVisible: isHistoryVisible,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />
        <div className="counter-container">
          <h1 className="counter-title">Счетчик</h1>
          <div className="counter-display" role="status" aria-live="polite">
            <span className="counter-value">{count}</span>
          </div>
          <div className="counter-controls">
            <BtnDEC onHandleMinus={onHandleMinus} disabled={!isValidStep} />
            <div className="step-control">
              <label htmlFor="step-input" className="step-label">
                Шаг:
              </label>
              <Inpt 
                step={step} 
                onHandleChangeStep={onHandleChangeStep}
                disabled={false}
              />
              {!isValidStep && (
                <span className="error-message" role="alert">
                  Шаг должен быть от 1 до 100
                </span>
              )}
            </div>
            <BtnINC onHandlePlus={onHandlePlus} disabled={!isValidStep} />
          </div>
          <div className="reset-undo-controls">
            <BtnReset onHandleReset={onHandleReset} />
            <UndoButton 
              onHandleUndo={undoLastOperation} 
              canUndo={historyState.canUndo}
            />
          </div>
          <HistoryPanel 
            history={historyState.entries}
            onClearHistory={clearHistory}
            isVisible={historyState.isHistoryVisible}
            onToggleVisibility={toggleHistoryVisibility}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
