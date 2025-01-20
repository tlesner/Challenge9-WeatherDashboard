import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

//body passed in via the payload
//param/query passed in via the URL
router.post('/', async (req: Request, res: Response) => {
  const city = req.body.cityName;
  const weather = await WeatherService.getWeatherForCity(city)
  HistoryService.addCity(city);
  return res.json(weather);
});

router.get('/history', async (_req: Request, res: Response) => {
  const cities = await HistoryService.getCities();
  return res.json(cities);
});

router.delete('/history/:cityId', async (req: Request, res: Response) => {
  const cityId = req.params.cityId;
  HistoryService.removeCity(cityId)
  .catch((error:any) => {
    console.log("🚀 ~ router.delete ~ error:", error)
    throw new Error('Unable to delete city from history.')
  })
  return res.json(undefined)
  //200 vs 204 return: 200 there should be something in the data, some feedback is being sent to the user. 204 still successful BUT nothing is being sent to the front-end user. 204 is less expensive.
});

export default router;
