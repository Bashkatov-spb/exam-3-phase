// Общие типы для приложения

export type TaskType = 'parrot' | 'calculator' | 'todo' | 'weather' | 'timer';

// Типы для Todo App
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';

// Типы для Weather Widget
export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

// Типы для Timer App
export type TimerMode = 'stopwatch' | 'countdown';

// Типы для Calculator
export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForOperand: boolean;
}

export type CalculatorOperation = '+' | '-' | '*' | '/' | '%' | '^';

// Общие типы для событий
export interface InputChangeEvent {
  target: {
    value: string;
  };
}

export interface KeyboardEvent {
  key: string;
}
