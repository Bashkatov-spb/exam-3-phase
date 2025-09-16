import React, { useState, useEffect, useRef } from 'react';
import './TimerApp.css';

type TimerMode = 'stopwatch' | 'countdown';

const TimerApp: React.FC = (): JSX.Element => {
  const [mode, setMode] = useState<TimerMode>('stopwatch');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(5);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (mode === 'stopwatch') {
          setTime(prev => prev + 1);
        } else {
          setTime(prev => {
            if (prev <= 1) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const startTimer = (): void => {
    if (mode === 'countdown' && time === 0) {
      setTime(countdownMinutes * 60 + countdownSeconds);
    }
    setIsRunning(true);
  };

  const stopTimer = (): void => {
    setIsRunning(false);
  };

  const resetTimer = (): void => {
    setIsRunning(false);
    if (mode === 'stopwatch') {
      setTime(0);
    } else {
      setTime(countdownMinutes * 60 + countdownSeconds);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCountdownMinutesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setCountdownMinutes(value);
    if (!isRunning) {
      setTime(value * 60 + countdownSeconds);
    }
  };

  const handleCountdownSecondsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setCountdownSeconds(value);
    if (!isRunning) {
      setTime(countdownMinutes * 60 + value);
    }
  };

  const getProgressPercentage = (): number => {
    if (mode === 'stopwatch') {
      return 0; // Для секундомера прогресс не показываем
    }
    const total = countdownMinutes * 60 + countdownSeconds;
    return total > 0 ? ((total - time) / total) * 100 : 0;
  };

  const isTimeUp = mode === 'countdown' && time === 0 && !isRunning && (countdownMinutes > 0 || countdownSeconds > 0);

  return (
    <div className="timer-app">
      <div className="timer-header">
        <h2>Таймер и Секундомер</h2>
        <div className="timer-mode-selector">
          <button
            className={`mode-button ${mode === 'stopwatch' ? 'active' : ''}`}
            onClick={() => {
              setMode('stopwatch');
              setIsRunning(false);
              setTime(0);
            }}
          >
            Секундомер
          </button>
          <button
            className={`mode-button ${mode === 'countdown' ? 'active' : ''}`}
            onClick={() => {
              setMode('countdown');
              setIsRunning(false);
              setTime(countdownMinutes * 60 + countdownSeconds);
            }}
          >
            Таймер
          </button>
        </div>
      </div>

      {mode === 'countdown' && (
        <div className="countdown-settings">
          <h3>Установить время:</h3>
          <div className="time-inputs">
            <div className="time-input-group">
              <label>Минуты:</label>
              <input
                type="number"
                min="0"
                max="59"
                value={countdownMinutes}
                onChange={handleCountdownMinutesChange}
                disabled={isRunning}
                className="time-input"
              />
            </div>
            <div className="time-input-group">
              <label>Секунды:</label>
              <input
                type="number"
                min="0"
                max="59"
                value={countdownSeconds}
                onChange={handleCountdownSecondsChange}
                disabled={isRunning}
                className="time-input"
              />
            </div>
          </div>
        </div>
      )}

      <div className="timer-display">
        <div className={`timer-time ${isTimeUp ? 'time-up' : ''}`}>
          {formatTime(time)}
        </div>
        {mode === 'countdown' && (
          <div className="timer-progress">
            <div 
              className="progress-bar"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        )}
      </div>

      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={startTimer} className="timer-button start-button">
            ▶️ Старт
          </button>
        ) : (
          <button onClick={stopTimer} className="timer-button stop-button">
            ⏸️ Пауза
          </button>
        )}
        <button onClick={resetTimer} className="timer-button reset-button">
          🔄 Сброс
        </button>
      </div>

      {isTimeUp && (
        <div className="time-up-notification">
          <h3>⏰ Время вышло!</h3>
          <p>Таймер завершил отсчет</p>
        </div>
      )}

      <div className="timer-info">
        <h4>Функции:</h4>
        <ul>
          <li><strong>Секундомер:</strong> Измеряет время с момента запуска</li>
          <li><strong>Таймер:</strong> Обратный отсчет до установленного времени</li>
          <li><strong>Пауза:</strong> Приостановка и возобновление</li>
          <li><strong>Сброс:</strong> Возврат к начальному состоянию</li>
        </ul>
      </div>
    </div>
  );
};

export default TimerApp;
