import { BaseComponent } from '../base-component';
import './header_form_add.scss';

export class HeaderFormAdd extends BaseComponent {
  constructor() {
    super('form', ['form_add']);
    this.element.innerHTML = `
        <input type="text" class="name" required>
        <input type="color" class="color">
        <button type="submit" class="submit">Create</button>
        `;
  }
}
