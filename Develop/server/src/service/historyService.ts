import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try{
      const data = await fs.promises.readFile('db/db.json', 'utf-8');
      return JSON.parse(data);
  } catch (error) {
    console.log("could not read search history")
  }}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.promises.writeFile('db/db.json', JSON.stringify(cities, null, '\t'))

  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {
  //   const cities = await this.read();
  //   const newCity = new City(city, cities.length.toString());
  //   cities.push(newCity);
  //   await this.write(cities);
  // }
  async addCity(city: string) {
    if (!city) {
      throw new Error('City Cannot be blank');
    }
    const newCity: City = {name: city, id: uuidv4() };
    return  await this.getCities()
      .then((cities => {
        if (cities.find((index: { name: string; }) => index.name === city)) {
          return cities;
        }
        return [...cities, newCity]
      }))
  }


  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  
  // async removeCity(id: string) {
  //   const cities = this.getCities();
  //   const filteredCities = cities.filter((cities: { id: string; }) =>cities.id !== id);
  //   return await this.write(filteredCities)

  // }
}

export default new HistoryService();
