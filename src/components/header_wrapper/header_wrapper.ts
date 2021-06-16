import { BaseComponent } from '../base-component';
import { Header } from '../header/header';
import { HeaderForms } from '../header_forms/header_forms';
import './header_wrapper.scss';

export class HeaderWrapper extends BaseComponent {
  private readonly Header: Header;

  private readonly HeaderForms: HeaderForms;

  constructor() {
    super('header', ['header_wrapper']);
    this.Header = new Header();
    this.element.appendChild(this.Header.element);
    this.HeaderForms = new HeaderForms();
    this.element.appendChild(this.HeaderForms.element);
  }
}
