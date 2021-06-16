import { BaseComponent } from '../base-component';
import './header_forms_bnts.scss';

export class HeaderFormsBtns extends BaseComponent {
  constructor() {
    super('div', ['header_forms_bnts']);
    this.element.innerHTML = `
        <button class="button forms_bnts race">Race</button>
        <button class="button forms_bnts reset_race">Reset</button>
        <button class="button gen_car">Generate cars</button>
        `;
  }
}
