import './styles.scss';
import { App } from './App';
import { Header } from './components/header/header';

window.onload = () => {
  new App(document.body);
  new Header().show();
};
