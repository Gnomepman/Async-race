import * as api from '../api/api'
import { carBody } from '../types/types';
import {renderGarage} from '../ui/ui'

document.getElementById("create")!.addEventListener('click', async (e) => {
    console.log(e);
    api.createCar(
      Object.fromEntries(
        new Map([
          ["name",
          (<HTMLInputElement>document.getElementById("car-create-name")).value],
          ["color",
          (<HTMLInputElement>document.getElementById("car-create-color")).value]])
      ) as carBody
    );
    await renderGarage();
});

document.getElementById("generate")!.addEventListener('click', async (e) => {
    console.log(e);
    const car_names: string[] = ['Tesla', 'Opel', 'Mazda', 'Ferrari', 'Ford', 'Reno', 'McLaren', 'Lanos'];
    const car_models: string[] = ['13', 'Kuga', 'GT 40', 'F350']
    const NUMBER_OF_CARS_TO_GENERATE = 100;
    for (let i = 0; i < NUMBER_OF_CARS_TO_GENERATE; i++){
        api.createCar(
            Object.fromEntries(
              new Map([
                ["name",
                car_names[Math.floor(Math.random()*car_names.length)].concat(' ', car_models[Math.floor(Math.random()*car_models.length)])],
                ["color",
                '#'.concat(Math.floor(Math.random() * 16777215).toString(16))]])
            ) as carBody
          );
    }
    await renderGarage();
});

document.getElementById("prev_page")!.addEventListener('click', async (e) => {
    localStorage.current_page = Number(localStorage.current_page) - 1;
    await renderGarage();
})

document.getElementById("next_page")!.addEventListener('click', async (e) => {
    localStorage.current_page = Number(localStorage.current_page) + 1;
    await renderGarage();
})