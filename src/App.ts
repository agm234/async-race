import './styles.scss';
import { HeaderWrapper } from './components/header_wrapper/header_wrapper';
import { Main } from './components/main/main';

export class App {
  private readonly HeaderWrapper: HeaderWrapper;

  private readonly Main: Main;

  constructor(private readonly rootElement: HTMLElement) {
    this.HeaderWrapper = new HeaderWrapper();
    this.rootElement.appendChild(this.HeaderWrapper.element);
    this.Main = new Main();
    this.rootElement.appendChild(this.Main.element);
  }
}
