import React, { useState } from 'react';
import './Calculator.css';

interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

const Calculator: React.FC = (): JSX.Element => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
  });

  const inputNumber = (num: string): void => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        display: num,
        waitingForOperand: false,
      });
    } else {
      setState({
        ...state,
        display: state.display === '0' ? num : state.display + num,
      });
    }
  };

  const inputDecimal = (): void => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        display: '0.',
        waitingForOperand: false,
      });
    } else if (state.display.indexOf('.') === -1) {
      setState({
        ...state,
        display: state.display + '.',
      });
    }
  };

  const clear = (): void => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForOperand: false,
    });
  };

  const performOperation = (nextOperation: string): void => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === null) {
      setState({
        ...state,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    } else if (state.operation) {
      const currentValue = state.previousValue || 0;
      const newValue = calculate(currentValue, inputValue, state.operation);

      setState({
        display: String(newValue),
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    }
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        if (secondValue === 0) {
          throw new Error('Деление на ноль');
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = (): void => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue !== null && state.operation) {
      try {
        const newValue = calculate(state.previousValue, inputValue, state.operation);
        setState({
          display: String(newValue),
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        });
      } catch (error) {
        setState({
          display: 'Ошибка',
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        });
      }
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        {state.display}
      </div>
      <div className="calculator-buttons">
        <button className="calculator-button calculator-button-clear" onClick={clear}>
          C
        </button>
        <button className="calculator-button calculator-button-operator" onClick={() => performOperation('/')}>
          ÷
        </button>
        <button className="calculator-button calculator-button-operator" onClick={() => performOperation('*')}>
          ×
        </button>
        <button className="calculator-button calculator-button-operator" onClick={() => performOperation('-')}>
          −
        </button>
        
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('7')}>
          7
        </button>
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('8')}>
          8
        </button>
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('9')}>
          9
        </button>
        <button className="calculator-button calculator-button-operator" onClick={() => performOperation('+')}>
          +
        </button>
        
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('4')}>
          4
        </button>
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('5')}>
          5
        </button>
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('6')}>
          6
        </button>
        <button className="calculator-button calculator-button-equals" onClick={handleEquals} rowSpan={2}>
          =
        </button>
        
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('1')}>
          1
        </button>
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('2')}>
          2
        </button>
        <button className="calculator-button calculator-button-number" onClick={() => inputNumber('3')}>
          3
        </button>
        
        <button className="calculator-button calculator-button-number calculator-button-zero" onClick={() => inputNumber('0')}>
          0
        </button>
        <button className="calculator-button calculator-button-number" onClick={inputDecimal}>
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
