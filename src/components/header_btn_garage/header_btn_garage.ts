import { BaseComponent } from '../base-component';
import './header_btn_garage.scss';

export class BtnGarage extends BaseComponent {
  constructor() {
    super('button', ['btn_garage']);
    this.element.innerHTML = `
        to garage
        `;
  }
}
