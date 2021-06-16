import { BaseComponent } from '../base-component';
import './pagination-winners.scss';

export class PaginationWiners extends BaseComponent {
  constructor() {
    super('div', ['pagination_winners']);
    this.element.innerHTML = `
        <button class="pagwinners_btn prevwinner">Prev</button>
        <button class="pagwinners_btn nextwinner" >Next</button>
        `;
  }
}
