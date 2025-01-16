import dotenv from 'dotenv';
import dayjs, { type Dayjs } from 'dayjs';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
    city: string;
    // country: string;
    date: Dayjs | string;
    iconDescription: string;
    // feelsLike: number;
    humidity: number;
    icon: string;
    tempF: number;
    windSpeed: number;

    constructor(
      city: string,
      // country: string,
      date: Dayjs | string,
      iconDescription: string,
      // feelsLike: number,
      humidity: number,
      icon: string,
      tempF: number,
      windSpeed: number,
  ) {
      this.city = city;
      this.date = date;
      this.icon = icon;
      this.tempF = tempF;
      this.windSpeed = windSpeed;
      // this.country = country;
      this.iconDescription = iconDescription;
      // this.feelsLike = feelsLike;
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
  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon } = locationData.city.coord;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/data/2.5/forecast?q=${this.cityName}&appid=${this.apiKey}&units=imperial`;


  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`;

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
      const fetchResponse = await fetch(query);
      response = await fetchResponse.json();
    }
    catch (err) {
      console.error(err);
      throw new Error('Unable to get weather data.')
    }
    // TODO: research Try-catch-finally

    const weather = this.parseCurrentWeather(response);
    return this.buildForecastArray(weather, response.list)
  }

  private parseCurrentWeather(response: any) {
      if (
        !response.list[0] || 
        !response.list[0].main || 
        !response.list[0].weather || 
        response.list[0].weather.length === 0
      ) { // Check if the response contains the necessary data
          throw new Error("Invalid weather data");
      }
        console.log('current weather', response.list[0])
        const currentWeather = response.list[0]

        return new Weather(
        this.cityName,
        dayjs.unix(currentWeather.dt).format('M/D/YYYY'),
        currentWeather.weather[0].description,
        currentWeather.main.humidity,
        currentWeather.weather[0].icon,
        currentWeather.main.temp,
        currentWeather.wind.speed,
      );
  }
 
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
		const forecast: Weather[] = [currentWeather];
		const weatherDataFiltered = weatherData.filter((data: any) => {
			return data.dt_txt.includes('12:00:00');
		});

		for (let i = 0; i < weatherDataFiltered.length; i++) {
			let weatherItem = weatherDataFiltered[i];
			
			forecast.push(
				new Weather(
					this.cityName,
					dayjs.unix(weatherItem.dt).format('M/D/YYYY'),
          weatherItem.weather[0].description,
          weatherItem.main.humidity,
					weatherItem.weather[0].icon,
					weatherItem.main.temp,
					weatherItem.wind.speed,
				)
			);
		}

		return forecast;
	};
  
  // TODO: Complete getWeatherForCity method 
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    return this.fetchWeatherData(coordinates)
  }
}

export default new WeatherService();
