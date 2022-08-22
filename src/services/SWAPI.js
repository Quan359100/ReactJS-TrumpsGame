import axios from 'axios';

const SWAPIClient = axios.create({
  baseURL: 'https://swapi.dev/api',
  timeout: 30000,
});

const SWAPIService = {
  async getAllStarships() {
    let nextPage = '/starships';
    let items = [];
    while (nextPage) {
      try {
        const response = await SWAPIClient.get(nextPage);
        const { results, next } = response.data;
        nextPage = next;
        items = [...items, ...results];
      } catch (error) {
        console.log(error);
      }
    }
    return items;
  },
};

export default SWAPIService;
