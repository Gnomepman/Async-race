import * as api from '../api/api'
import { carBody } from '../types/types';
import {renderGarage} from '../ui/ui'

document.getElementById("create")!.addEventListener('click', async () => {
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

document.getElementById("generate")!.addEventListener('click', async () => {
    const car_names: string[] = ['Tesla', 'Opel', 'Mazda', 'Ferrari', 'Ford', 'Reno', 'McLaren', 'Lanos', 'Audi'];
    const car_models: string[] = ['13', 'Kuga', 'GT 40', 'F350', 'Magnum', 'Ascona', '1990', 'R8']
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

document.getElementById("prev_page")!.addEventListener('click', async () => {
    localStorage.current_page = Number(localStorage.current_page) - 1;
    await renderGarage();
})

document.getElementById("next_page")!.addEventListener('click', async () => {
    localStorage.current_page = Number(localStorage.current_page) + 1;
    await renderGarage();
})

document.getElementById("update")!.addEventListener('click', async () => {
    if (Number(localStorage.id_to_edit) !== 0){
        await api.updateCar(
          Number(localStorage.id_to_edit),
          Object.fromEntries(
            new Map([
              [
                "name",
                (<HTMLInputElement>document.getElementById("car-edit-name")).value,
              ],
              [
                "color",
                (<HTMLInputElement>document.getElementById("car-edit-color")).value,
              ],
            ])
          ) as carBody
        );

        await renderGarage();
        localStorage.id_to_edit = 0;
        (<HTMLInputElement>document.getElementById("car-edit-name")).value = '';
    }
});

document.getElementById("race")!.addEventListener('click', () => {
    Array.from(document.querySelectorAll('.start')).forEach(element => {
        (element as HTMLElement).click();
    })
})

document.getElementById("reset")!.addEventListener('click', () => {
  Array.from(document.querySelectorAll('.stop')).forEach(element => {
      (element as HTMLElement).click();
  })
})