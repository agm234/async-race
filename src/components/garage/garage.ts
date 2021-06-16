import { BaseComponent } from '../base-component';
import { CarsList } from '../cars-list/cars-list';
import { Pagination } from '../pagination_garage/pagination_garage';
import { GarageWinner } from '../garage-winner/garage-winner';
import { WinnersTableBody } from '../winners-table-body/winners-table-body';
import { start, stop } from '../../start-stop';
import {
  getCar, createCar, deleteCar, updateCar, getCars, deleteWinner, saveWinner,
} from '../../api';
import './garage.scss';

interface CarOBJ {
  color: string;
  id: number;
  name: string;
}
interface Start {
  success: boolean;
  id: number;
  time: number;
}
interface Race {
  color: string;
  id: number;
  name: string;
  time: number;
}

export class Garage extends BaseComponent {
  private readonly Pagination: Pagination;

  public readonly CarsList: CarsList;

  public readonly GarageWinner: GarageWinner;

  public count: number;

  constructor() {
    super('div', ['garage']);
    this.count = 4;
    this.CarsList = new CarsList();
    this.GarageWinner = new GarageWinner();
    this.element.innerHTML = `
        <div class="headers">
            <h1 class="garage_count">Garage (${this.CarsList.count})</h1>
            <h2>Page #${this.CarsList.page}</h2>
        </div>
        `;
    this.element.appendChild(this.CarsList.element);
    this.element.appendChild(this.GarageWinner.element);
    this.Pagination = new Pagination();
    this.element.appendChild(this.Pagination.element);
    this.deleteSelectUpdate();
    this.add();
  }

  async deleteSelectUpdate(): Promise<void> {
    document.body.addEventListener('click', async (el) => {
      const garageWinner = document.querySelector('.garage_winner') as HTMLElement;
      if ((el.target as HTMLElement).classList.contains('delete')) {
        this.Delete(el.target as HTMLButtonElement);
      }
      if ((el.target as HTMLElement).classList.contains('select')) {
        this.Select(el.target as HTMLButtonElement);
      }
      if ((el.target as HTMLButtonElement).classList.contains('start')) {
        const id = parseInt((el.target as HTMLButtonElement).value, 10);
        start(id);
      }
      if ((el.target as HTMLElement).classList.contains('stop')) {
        const id = parseInt((el.target as HTMLButtonElement).value, 10);
        stop(id);
      }
      if ((el.target as HTMLElement).classList.contains('race')) {
        (document.querySelector('.race') as HTMLButtonElement).disabled = true;
        const winner = await this.race(start);
        garageWinner.innerHTML = `
        ${winner.name} won the race against time ${winner.time}
        `;
        garageWinner.classList.remove('hide');
        saveWinner(winner);
        const table = document.querySelector('.winners_table_body') as HTMLElement;
        table.innerHTML = '';
        new WinnersTableBody();
      }
      if ((el.target as HTMLElement).classList.contains('reset_race')) {
        this.reset(stop);
        garageWinner.classList.add('hide');
        (document.querySelector('.race') as HTMLButtonElement).disabled = false;
      }
    });
  }

  add(): void {
    const form = document.querySelector('.form_add') as HTMLFormElement;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = (document.querySelector('.name') as HTMLInputElement).value;
      const color = (document.querySelector('.color') as HTMLInputElement).value;
      createCar({
        name,
        color,
      });
      this.getcount();
      const count = document.querySelector('.garage_count') as HTMLElement;
      count.innerHTML = `
            Grage(${this.count})
            `;
      form.reset();
      (document.querySelector('.cars_list') as HTMLDivElement).innerHTML = '';
      this.CarsList.getCarMet(this.CarsList.page);
    });
  }

  async getcount(): Promise<void> {
    this.count = (await getCars(1)).count;
  }

  Delete(el: HTMLButtonElement): void {
    deleteCar(parseInt(el.value, 10));
    deleteWinner(parseInt(el.value, 10));
    (document.querySelector('.cars_list') as HTMLDivElement).innerHTML = '';
    this.CarsList.getCarMet(this.CarsList.page);
    (document.querySelector('.winners_table_body') as HTMLElement).innerHTML = '';
    new WinnersTableBody();
  }

  async Select(el: HTMLButtonElement): Promise<void> {
    const car = getCar(parseInt(el.value, 10));
    const inputname = document.querySelector('.name_update') as HTMLInputElement;
    const inputcolor = document.querySelector('.color_update') as HTMLInputElement;
    const submit = document.querySelector('.submit_update') as HTMLButtonElement;
    inputname.disabled = false;
    inputcolor.disabled = false;
    submit.disabled = false;
    const { id } = await car;
    let { name } = await car;
    let { color } = await car;
    inputname.value = name;
    inputcolor.value = color;
    const form = document.querySelector('.form_update') as HTMLFormElement;
    form.onsubmit = (event) => {
      event.preventDefault();
      inputname.disabled = true;
      inputcolor.disabled = true;
      submit.disabled = true;
      name = inputname.value;
      color = inputcolor.value;
      updateCar(id, { name, color });
      (document.querySelector('.cars_list') as HTMLDivElement).innerHTML = '';
      this.CarsList.getCarMet(this.CarsList.page);
      form.reset();
    };
  }

  async raceCars(promises: Promise<Start>[], ids: number[]): Promise<Race> {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const filedIndex = ids.findIndex((i) => i === id);
      const restPromise = [...promises.slice(0, filedIndex), ...promises.slice(filedIndex + 1, promises.length)];
      const restIds = [...ids.slice(0, filedIndex), ...ids.slice(filedIndex + 1, ids.length)];
      return this.raceCars(restPromise, restIds);
    }
    const winner = {
      ...((await getCars(this.CarsList.page)).items as Array<CarOBJ>).find((car) => car.id === id),
      time: +(time / 1000).toFixed(2),
    } as Race;
    return winner;
  }

  async race(action: (id: number) => Promise<Start>): Promise<Race> {
    const promise = ((await getCars(this.CarsList.page)).items as Array<CarOBJ>).map(({ id }) => action(id));
    const winner = await this.raceCars(
      promise,
      ((await getCars(this.CarsList.page)).items as Array<CarOBJ>).map(({ id }) => id),
    );
    return winner;
  }

  async reset(action: (id: number) => Promise<void>): Promise<void> {
    ((await getCars(this.CarsList.page)).items as Array<CarOBJ>).map(({ id }) => action(id));
  }
}
