import { BaseComponent } from '../base-component';
import './winners-table-row.scss';
import { Car } from '../car/car';

interface Winner {
  index: number;
  id: number;
  name: string;
  color: string;
  wins: number;
  time: number;
}

export class WinnersTablerow extends BaseComponent {
  private readonly Car: Car;

  constructor({
    index, id, name, color, wins, time,
  }: Winner) {
    super('tr', ['winners_table_row']);
    this.Car = new Car(color);
    this.element.innerHTML = `
        <td>${index}</th>
        <td class="table_car" id="winner${id}"></th>
        <td>${name}</th>
        <td>${wins}</th>
        <td>${time}</th>
        `;
  }

  addCarImg(id: number): void {
    document.getElementById(`winner${id}`)?.appendChild(this.Car.element);
  }
}
