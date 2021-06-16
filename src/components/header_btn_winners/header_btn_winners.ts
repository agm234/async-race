import { BaseComponent } from '../base-component';
import './header_btn_winners.scss';

export class BtnWinners extends BaseComponent {
  constructor() {
    super('button', ['btn_winner']);
    this.element.innerHTML = `
        to winners
        `;
  }
}
