// Константы приложения

export const TASK_TYPES = {
  PARROT: 'parrot' as const,
  CALCULATOR: 'calculator' as const,
  TODO: 'todo' as const,
  WEATHER: 'weather' as const,
  TIMER: 'timer' as const,
};

export const CALCULATOR_OPERATIONS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  MODULO: '%',
  POWER: '^',
} as const;

export const TODO_FILTERS = {
  ALL: 'all' as const,
  ACTIVE: 'active' as const,
  COMPLETED: 'completed' as const,
};

export const TIMER_MODES = {
  STOPWATCH: 'stopwatch' as const,
  COUNTDOWN: 'countdown' as const,
};

export const WEATHER_ICONS = {
  SUNNY: '☀️',
  CLOUDY: '☁️',
  RAINY: '🌧️',
  SNOWY: '❄️',
  FOGGY: '🌫️',
  STORMY: '⛈️',
  WINDY: '💨',
  DEFAULT: '🌤️',
} as const;

export const MOCK_WEATHER_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Сочи',
  'Екатеринбург',
] as const;
