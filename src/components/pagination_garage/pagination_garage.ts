import { BaseComponent } from '../base-component';
import './pagination_garage.scss';

export class Pagination extends BaseComponent {
  constructor() {
    super('div', ['pagination']);
    this.element.innerHTML = `
        <button class="pag_btn prev">Prev</button>
        <button class="pag_btn next" >Next</button>
        `;
  }
}
