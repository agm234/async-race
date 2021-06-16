import { BaseComponent } from '../base-component';
import { HeaderFormAdd } from '../header_form_add/header_form_add';
import { HeaderFormUpdate } from '../header_form_update/header_form_update';
import { HeaderFormsBtns } from '../header_forms_bnts/header_forms_bnts';
import './header_forms.scss';

export class HeaderForms extends BaseComponent {
  private readonly HeaderFormAdd: HeaderFormAdd;

  private readonly HeaderFormUpdate: HeaderFormUpdate;

  private readonly HeaderFormsBtns: HeaderFormsBtns;

  constructor() {
    super('div', ['header_forms']);
    this.HeaderFormAdd = new HeaderFormAdd();
    this.element.appendChild(this.HeaderFormAdd.element);
    this.HeaderFormUpdate = new HeaderFormUpdate();
    this.element.appendChild(this.HeaderFormUpdate.element);
    this.HeaderFormsBtns = new HeaderFormsBtns();
    this.element.appendChild(this.HeaderFormsBtns.element);
  }
}
