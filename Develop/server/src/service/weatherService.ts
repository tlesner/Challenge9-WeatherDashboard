import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
    city: string;
    country: string;
    date: string;
    description: string;
    feelsLike: number;
    humidity: number;
    icon: string;
    temp: number;
    wind: number;

    constructor(
      city: string,
      country: string,
      date: string,
      description: string,
      feelsLike: number,
      humidity: number,
      icon: string,
      temp: number,
      wind: number,
  ) {
      this.city = city;
      this.date = date;
      this.icon = icon;
      this.temp = temp;
      this.wind = wind;
      this.country = country;
      this.description = description;
      this.feelsLike = feelsLike;
      this.humidity = humidity;

  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  private cityName: string = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    this.cityName = query
    const geocode = this.buildGeocodeQuery();
    try { 
      const response = await fetch(geocode);
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Cannot fetch location data');
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/data/2.5/forecast?q=${this.cityName}&appid=${this.apiKey}`;


  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName)
    return this.destructureLocationData(locationData)
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    let response: any;
    try{ 
      response = await fetch(query);
    }
    catch (err) {
      console.error(err);
      throw new Error('Unable to get weather data.')
    }
    const weather = await this.parseCurrentWeather(response);
    return weather;

  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
      if (!response || !response.main || !response.weather || response.weather.length === 0) { // Check if the response contains the necessary data

          throw new Error("Invalid weather data");
      }
  
      // Extract relevant information from the response
      const cityName = response.name;
      const temperature = response.main.temp; // Temperature in Kelvin converted to Fahrenheit
      const humidity = response.main.humidity; // Humidity in percentage
      const windSpeed = response.wind.speed; // Wind speed in m/s
      const weatherDescription = response.weather[0].description; // Weather description
      const weatherIcon = response.weather[0].icon; // Weather icon code
  
      // Return an object containing the parsed data
      return {
          cityName,
          temperature,
          humidity,
          windSpeed,
          weatherDescription,
          weatherIcon,
      };
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast: Weather[] = [];
    const filteredWeatherData = weatherData.filter(weatherItem => {
        // Implement filtering logic based on your criteria (e.g., date)
        // You might want to filter for specific days or intervals
    });

    // Loop through filteredWeatherData and create Weather objects
    filteredWeatherData.forEach(item => {
        const weather = new Weather(
            currentWeather.city,
            currentWeather.country,
            item.date,
            item.weather[0].description,
            item.main.feels_like,
            item.main.humidity,
            item.weather[0].icon,
            item.main.temp,
            item.wind.speed
        );
        forecast.push(weather);
    });

    return forecast;
}
  
  // TODO: Complete getWeatherForCity method 
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = this.
    return this.fetchWeatherData
  }
}

export default new WeatherService();
