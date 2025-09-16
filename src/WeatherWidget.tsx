import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherWidget: React.FC = (): JSX.Element => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Москва');

  // Моковые данные для демонстрации
  const mockWeatherData: WeatherData[] = [
    {
      city: 'Москва',
      temperature: 15,
      description: 'Облачно',
      humidity: 65,
      windSpeed: 12,
      icon: '☁️'
    },
    {
      city: 'Санкт-Петербург',
      temperature: 12,
      description: 'Дождь',
      humidity: 80,
      windSpeed: 18,
      icon: '🌧️'
    },
    {
      city: 'Новосибирск',
      temperature: 8,
      description: 'Снег',
      humidity: 70,
      windSpeed: 15,
      icon: '❄️'
    },
    {
      city: 'Сочи',
      temperature: 22,
      description: 'Солнечно',
      humidity: 55,
      windSpeed: 8,
      icon: '☀️'
    },
    {
      city: 'Екатеринбург',
      temperature: 5,
      description: 'Туман',
      humidity: 85,
      windSpeed: 5,
      icon: '🌫️'
    }
  ];

  const getWeatherIcon = (description: string): string => {
    const iconMap: { [key: string]: string } = {
      'солнечно': '☀️',
      'облачно': '☁️',
      'дождь': '🌧️',
      'снег': '❄️',
      'туман': '🌫️',
      'гроза': '⛈️',
      'ветрено': '💨'
    };
    
    const lowerDesc = description.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerDesc.includes(key)) {
        return icon;
      }
    }
    return '🌤️';
  };

  const fetchWeather = async (cityName: string): Promise<void> => {
    setLoading(true);
    setError('');
    
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundWeather = mockWeatherData.find(w => 
      w.city.toLowerCase() === cityName.toLowerCase()
    );
    
    if (foundWeather) {
      setWeather(foundWeather);
    } else {
      // Генерируем случайные данные для неизвестного города
      const randomTemp = Math.floor(Math.random() * 30) - 5;
      const descriptions = ['Солнечно', 'Облачно', 'Дождь', 'Снег', 'Туман'];
      const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      setWeather({
        city: cityName,
        temperature: randomTemp,
        description: randomDesc,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        icon: getWeatherIcon(randomDesc)
      });
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleSearch = (): void => {
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTemperatureColor = (temp: number): string => {
    if (temp < 0) return '#4A90E2'; // Синий для мороза
    if (temp < 10) return '#87CEEB'; // Голубой для холода
    if (temp < 20) return '#98FB98'; // Светло-зеленый для прохлады
    if (temp < 30) return '#FFD700'; // Золотой для тепла
    return '#FF6347'; // Красный для жары
  };

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h2>Погода</h2>
        <div className="weather-search">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            onKeyPress={handleKeyPress}
            placeholder="Введите город..."
            className="weather-input"
          />
          <button onClick={handleSearch} className="weather-search-button">
            Поиск
          </button>
        </div>
      </div>

      {loading && (
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Загрузка...</p>
        </div>
      )}

      {error && (
        <div className="weather-error">
          <p>❌ {error}</p>
        </div>
      )}

      {weather && !loading && (
        <div className="weather-content">
          <div className="weather-main">
            <div className="weather-icon">{weather.icon}</div>
            <div className="weather-temp" style={{ color: getTemperatureColor(weather.temperature) }}>
              {weather.temperature}°C
            </div>
          </div>
          
          <div className="weather-details">
            <h3 className="weather-city">{weather.city}</h3>
            <p className="weather-description">{weather.description}</p>
            
            <div className="weather-info">
              <div className="weather-info-item">
                <span className="info-label">💧 Влажность:</span>
                <span className="info-value">{weather.humidity}%</span>
              </div>
              <div className="weather-info-item">
                <span className="info-label">💨 Ветер:</span>
                <span className="info-value">{weather.windSpeed} м/с</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="weather-cities">
        <h4>Популярные города:</h4>
        <div className="cities-list">
          {mockWeatherData.map((cityData) => (
            <button
              key={cityData.city}
              onClick={() => {
                setCity(cityData.city);
                fetchWeather(cityData.city);
              }}
              className="city-button"
            >
              {cityData.city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
