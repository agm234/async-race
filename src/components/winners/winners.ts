import { BaseComponent } from '../base-component';
import { WinnersTable } from '../winners_table/winners_table';
import { PaginationWiners } from '../pagination-winners/pagination-winners';
import './winners.scss';

export class Winners extends BaseComponent {
  private readonly WinnersTable: WinnersTable;

  private readonly PaginationWiners: PaginationWiners;

  constructor() {
    super('div', ['winners', 'hide']);
    this.WinnersTable = new WinnersTable();
    this.element.innerHTML = `
    <div class="winners_headers">
        <h1 class="winners_count">Winners(${this.WinnersTable.count})</h1>
        <h2>Page #${this.WinnersTable.page}</h2>
    </div>
    `;
    this.element.appendChild(this.WinnersTable.element);
    this.PaginationWiners = new PaginationWiners();
    this.element.appendChild(this.PaginationWiners.element);
  }
}
