import { BaseComponent } from '../base-component';
import { CarAndRoad } from '../car-and-road/car-and-road';
import { createCar, getCars } from '../../api';
import './cars-list.scss';

interface CarOBJ {
  color: string;
  id: number;
  name: string;
}
export class CarsList extends BaseComponent {
  public page: number;

  public count: number;

  public names: string[];

  public models: string[];

  public leter: string;

  constructor() {
    super('ul', ['cars_list']);
    this.names = ['BMW', 'Mersedes', 'Tesla', 'Audi', 'Porshe', 'Lamborghini', 'Ferrari', 'Mclaren', 'Opel', 'Volvo'];
    this.models = ['M8', 'G63', 'Model X', 'R8', '911', 'Urus', '488', 'P1', 'Vectra', 'XC90'];
    this.leter = '0123456789ABCDEF';
    this.page = 1;
    this.count = 4;
    this.getCarMet(this.page);
    this.renderCars();
  }

  async getCarMet(page: number): Promise<void> {
    this.count = (await getCars(this.page)).count;
    ((await getCars(page)).items as Array<CarOBJ>).forEach((el) => {
      const caradnroad = new CarAndRoad(el);
      document.querySelector('.cars_list')?.appendChild(caradnroad.element);
      caradnroad.addCarImg(el.id);
    });
    await this.paginPrev();
    await this.paginNext();
  }

  async paginNext(): Promise<void> {
    const btn = document.querySelector('.next') as HTMLButtonElement;
    if (this.page * 7 < this.count) {
      btn.disabled = false;
      btn.onclick = () => {
        this.page += 1;
        (document.querySelector('.cars_list') as HTMLDivElement).innerHTML = '';
        this.getCarMet(this.page);
      };
    } else {
      btn.disabled = true;
    }
    this.updateStateGarage();
  }

  paginPrev(): void {
    const btn = document.querySelector('.prev') as HTMLButtonElement;
    if (this.page > 1) {
      btn.disabled = false;
      btn.onclick = () => {
        this.page -= 1;
        (document.querySelector('.cars_list') as HTMLDivElement).innerHTML = '';
        this.getCarMet(this.page);
      };
    } else {
      btn.disabled = true;
    }
    this.updateStateGarage();
  }

  getRandomName(): string {
    const name = this.names[Math.floor(Math.random() * this.names.length)];
    const model = this.models[Math.floor(Math.random() * this.models.length)];
    return `${name} ${model}`;
  }

  getRandomColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += this.leter[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  generateRandomCars(): {
    name: string;
    color: string;
  }[] {
    const count = 100;
    const arr = new Array(count).fill(1).map(() => ({ name: this.getRandomName(), color: this.getRandomColor() }));
    return arr;
  }

  renderCars(): void {
    const btn = document.querySelector('.gen_car') as HTMLButtonElement;
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const cars = this.generateRandomCars();
      await Promise.all(
        cars.map(async (c) => {
          await createCar(c);
        }),
      );
      (document.querySelector('.cars_list') as HTMLDivElement).innerHTML = '';
      this.getCarMet(this.page);
      this.updateStateGarage();
      btn.disabled = false;
    });
  }

  updateStateGarage(): void {
    const headers = document.querySelector('.headers') as HTMLDivElement;
    headers.innerHTML = `
        <h1 class="garage_count">Garage (${this.count})</h1>
        <h2>Page #${this.page}</h2>
    `;
  }
}
