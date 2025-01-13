import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService';
import historyService from '../../service/historyService';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city = req.params.city;
  let weather: any[] = [];
  WeatherService.getWeatherForCity(city).then((resolved) => {
    weather = resolved;
  }).catch.(error) => {
    console
    throw new Error(`Cannot get city/weather information.`)
  },
  // TODO: save city to search history
  historyService.addCity(city);
  return weather;
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  const cities = await HistoryService.getCities();
  return cities;
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
