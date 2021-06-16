import { BaseComponent } from '../base-component';
import './header_form_update.scss';

export class HeaderFormUpdate extends BaseComponent {
  constructor() {
    super('form', ['form_update']);
    this.element.innerHTML = `
        <input type="text" class="name_update " disabled>
        <input type="color" class="color_update " disabled>
        <button type="submit" class="button submit_update " disabled>update</button>
        `;
  }
  // update() {
  //     (this.element as HTMLFormElement) = (document.querySelector('.form_update') as HTMLFormElement);
  //     this.element.addEventListener('submit', (event) => {
  //         event.preventDefault();
  //         let name = (document.querySelector('.name_update') as HTMLInputElement).value;
  //         let color = (document.querySelector('.color_update') as HTMLInputElement).value;
  //         // updateCar(2,{
  //         //     name: name,
  //         //     color: color
  //         // });
  //         (this.element as HTMLFormElement).reset();
  //     })
  // }
}
