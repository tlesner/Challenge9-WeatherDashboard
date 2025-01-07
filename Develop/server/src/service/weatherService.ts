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
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const locationData = await fetch(
      `${this.baseURL}/data/2.5/forecast?q=${this.cityName}&appid=${this.apiKey}`
        );
    return locationData.json()
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
    const { lat, lon } = this.destructureLocationData(coordinates);
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {

  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {

  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

  }
}

export default new WeatherService();
