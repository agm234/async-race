import { BaseComponent } from '../base-component';
import { Winners } from '../winners/winners';
import { Garage } from '../garage/garage';
// import { store } from '../../store';
import './main.scss';

export class Main extends BaseComponent {
  private readonly Winners: Winners;

  private readonly Garage: Garage;

  constructor() {
    super('main', ['main']);
    this.Winners = new Winners();
    this.element.appendChild(this.Winners.element);
    this.Garage = new Garage();
    this.element.appendChild(this.Garage.element);
    // console.log(store)
    // this.element.innerHTML = `
    // ${store.carsCount}
    // `;
  }
}
