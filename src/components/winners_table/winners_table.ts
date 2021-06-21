import { BaseComponent } from '../base-component';
import { WinnersTableHead } from '../winners-table-head/winners-table-head';
import { WinnersTableBody } from '../winners-table-body/winners-table-body';
import './winners_table.scss';

export class WinnersTable extends BaseComponent {
  private readonly WinnersTableHead: WinnersTableHead;

  private readonly WinnersTableBody: WinnersTableBody;

  public count: number;

  public page: number;

  constructor() {
    super('table', ['winners_table']);
    this.WinnersTableHead = new WinnersTableHead();
    this.element.appendChild(this.WinnersTableHead.element);
    this.WinnersTableBody = new WinnersTableBody();
    this.element.appendChild(this.WinnersTableBody.element);
    this.count = this.WinnersTableBody.count;
    this.page = this.WinnersTableBody.page;
  }
}
