import { BaseComponent } from '../base-component';
import { WinnersTablerow } from '../winners-table-row/winners-table-row';

import './winners-table-body.scss';
import { getWinners } from '../../api';

interface CarOBJ {
  color: string;
  id: number;
  name: string;
}
interface Winn {
  id: number;
  wins: number;
  time: number;
  car: CarOBJ;
}

export class WinnersTableBody extends BaseComponent {
  public page: number;

  public index: number;

  public count: number;

  constructor() {
    super('tbody', ['winners_table_body']);
    this.count = 1;
    this.page = 1;
    this.index = 0;
    this.getWinnersMet(this.page);
  }

  async getWinnersMet(page: number): Promise<void> {
    this.count = (await getWinners(page, 10, '', '')).count;
    ((await getWinners(page, 10, '', '')).items as Array<Winn>).forEach((el) => {
      this.index += 1;
      const { id } = el;
      const { index } = this;
      const { name } = el.car;
      const { color } = el.car;
      const { wins } = el;
      const { time } = el;
      const winer = new WinnersTablerow({
        index,
        id,
        name,
        color,
        wins,
        time,
      });
      document.querySelector('.winners_table_body')?.appendChild(winer.element);
      winer.addCarImg(el.id);
    });
    await this.paginPrev();
    await this.paginNext();
    await this.updateStateWinner();
  }

  async paginNext(): Promise<void> {
    const btn = document.querySelector('.nextwinner') as HTMLButtonElement;
    if (this.page * 10 < this.count) {
      btn.disabled = false;
      btn.onclick = () => {
        this.page += 1;
        (document.querySelector('.winners_table_body') as HTMLDivElement).innerHTML = '';
        this.getWinnersMet(this.page);
      };
    } else {
      btn.disabled = true;
    }
    this.updateStateWinner();
  }

  paginPrev(): void {
    const btn = document.querySelector('.prevwinner') as HTMLButtonElement;
    if (this.page > 1) {
      btn.disabled = false;
      btn.onclick = async () => {
        this.index -= 10 + (await getWinners(this.page, 10, '', '')).items.length;
        this.page -= 1;
        (document.querySelector('.winners_table_body') as HTMLDivElement).innerHTML = '';
        this.getWinnersMet(this.page);
      };
    } else {
      btn.disabled = true;
    }
    this.updateStateWinner();
  }

  updateStateWinner(): void {
    const headers = document.querySelector('.winners_headers') as HTMLDivElement;
    headers.innerHTML = `
        <h1>Garage (${this.count})</h1>
        <h2>Page #${this.page}</h2>
    `;
  }
}
