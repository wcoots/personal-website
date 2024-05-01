import { useEffect } from 'react';
import { useWeather } from '@/hooks';
import { formatTime } from '@/utils';
import styles from './Widget.module.css';

function FootballWidget() {
  const { weather, getWeather } = useWeather();

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className={styles['widget-weather']}>
      {weather && (
        <div className={styles['weather-container']}>
          <h1 className={styles['weather-text']}>{weather.name}</h1>
          <div className={styles['weather-header']}>
            <img
              className={styles['weather-image']}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
            <h1 className={styles['weather-text']}>{weather.main.temp.toFixed(1)}°C</h1>
          </div>
          <p className={styles['weather-text']}>{weather.weather[0].description}</p>
          <p className={styles['weather-text']}>
            ☼ {formatTime(weather.sys.sunrise)} - {formatTime(weather.sys.sunset)} ☀
          </p>
        </div>
      )}
    </div>
  );
}

export default FootballWidget;
