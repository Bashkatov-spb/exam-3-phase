// Утилиты приложения

import { WEATHER_ICONS } from '../constants';

// Форматирование времени для таймера
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Получение иконки погоды по описанию
export const getWeatherIcon = (description: string): string => {
  const iconMap: { [key: string]: string } = {
    'солнечно': WEATHER_ICONS.SUNNY,
    'облачно': WEATHER_ICONS.CLOUDY,
    'дождь': WEATHER_ICONS.RAINY,
    'снег': WEATHER_ICONS.SNOWY,
    'туман': WEATHER_ICONS.FOGGY,
    'гроза': WEATHER_ICONS.STORMY,
    'ветрено': WEATHER_ICONS.WINDY,
  };
  
  const lowerDesc = description.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lowerDesc.includes(key)) {
      return icon;
    }
  }
  return WEATHER_ICONS.DEFAULT;
};

// Валидация ввода времени
export const validateTimeInput = (value: string, max: number = 59): number => {
  const numValue = parseInt(value) || 0;
  return Math.max(0, Math.min(max, numValue));
};

// Генерация уникального ID
export const generateId = (): number => {
  return Date.now() + Math.random();
};

// Очистка строки от лишних пробелов
export const trimText = (text: string): string => {
  return text.trim();
};

// Проверка на пустую строку
export const isEmpty = (text: string): boolean => {
  return trimText(text) === '';
};
