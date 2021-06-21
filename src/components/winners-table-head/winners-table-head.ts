import { BaseComponent } from '../base-component';
import './winners-table-head.scss';

export class WinnersTableHead extends BaseComponent {
  constructor() {
    super('thead', ['winners_table_head']);
    this.element.innerHTML = `
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table_head_wins" >Wins</th>
        <th class="table_head_time">Time</th>
        `;
  }
}
