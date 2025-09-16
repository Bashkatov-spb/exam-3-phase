import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Inpt from './Inpt';
import Btn from './Btn';
import Calculator from './Calculator';
import TodoApp from './TodoApp';
import WeatherWidget from './WeatherWidget';
import TimerApp from './TimerApp';

type TaskType = 'parrot' | 'calculator' | 'todo' | 'weather' | 'timer';

function App(): JSX.Element {
  const [text, setText] = useState('');
  const [currentTask, setCurrentTask] = useState<TaskType>('parrot');

  const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const onHandleAddExMark = (): void => {
    setText(`${text}!`);
  };

  const renderTask = (): JSX.Element => {
    switch (currentTask) {
      case 'parrot':
        return (
          <div className="task-container">
            <h3>{text}</h3>
            <Inpt text={text} onHandleChangeText={onHandleChangeText} />
            <Btn onHandleAddExMark={onHandleAddExMark} />
            <h3>Parrot</h3>
          </div>
        );
      case 'calculator':
        return (
          <div className="task-container">
            <h3>Калькулятор</h3>
            <Calculator />
          </div>
        );
      case 'todo':
        return (
          <div className="task-container">
            <TodoApp />
          </div>
        );
      case 'weather':
        return (
          <div className="task-container">
            <WeatherWidget />
          </div>
        );
      case 'timer':
        return (
          <div className="task-container">
            <TimerApp />
          </div>
        );
      default:
        return <div>Выберите задание</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div className="task-selector">
          <button 
            className={`task-button ${currentTask === 'parrot' ? 'active' : ''}`}
            onClick={() => setCurrentTask('parrot')}
          >
            🦜 Попугай
          </button>
          <button 
            className={`task-button ${currentTask === 'calculator' ? 'active' : ''}`}
            onClick={() => setCurrentTask('calculator')}
          >
            🧮 Калькулятор
          </button>
          <button 
            className={`task-button ${currentTask === 'todo' ? 'active' : ''}`}
            onClick={() => setCurrentTask('todo')}
          >
            ✅ Список дел
          </button>
          <button 
            className={`task-button ${currentTask === 'weather' ? 'active' : ''}`}
            onClick={() => setCurrentTask('weather')}
          >
            🌤️ Погода
          </button>
          <button 
            className={`task-button ${currentTask === 'timer' ? 'active' : ''}`}
            onClick={() => setCurrentTask('timer')}
          >
            ⏱️ Таймер
          </button>
        </div>

        {renderTask()}
      </header>
    </div>
  );
}

export default App;
