import { BaseComponent } from '../base-component';
import { BtnGarage } from '../header_btn_garage/header_btn_garage';
import { BtnWinners } from '../header_btn_winners/header_btn_winners';
import './header.scss';

export class Header extends BaseComponent {
  private readonly BtnGarage: BtnGarage;

  private readonly BtnWinners: BtnWinners;

  private garage: HTMLElement;

  private winner: HTMLElement;

  constructor() {
    super('div', ['header']);
    this.BtnGarage = new BtnGarage();
    this.element.appendChild(this.BtnGarage.element);
    this.BtnWinners = new BtnWinners();
    this.element.appendChild(this.BtnWinners.element);
    this.garage = document.querySelector('.garage') as HTMLElement;
    this.winner = document.querySelector('.winners') as HTMLElement;
  }

  show(): void {
    document.querySelector('.btn_garage')?.addEventListener('click', () => {
      if (this.garage.classList.contains('hide')) {
        this.garage.classList.remove('hide');
        this.winner.classList.add('hide');
        document.querySelector('.header_forms')?.classList.remove('hide');
      }
    });
    document.querySelector('.btn_winner')?.addEventListener('click', () => {
      if (this.winner.classList.contains('hide')) {
        this.winner.classList.remove('hide');
        this.garage.classList.add('hide');
        document.querySelector('.header_forms')?.classList.add('hide');
      }
    });
  }
}
