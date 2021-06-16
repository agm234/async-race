import { animation, getDistanse } from './animation';
import { startEngine, stopEngine, drive } from './api';
import { storeAnimation } from './store';

interface Start {
  success: boolean;
  id: number;
  time: number;
}

export const start = async (id: number): Promise<Start> => {
  (document.getElementById(`start${id}`) as HTMLButtonElement).disabled = true;
  (document.getElementById(`stop${id}`) as HTMLButtonElement).disabled = false;
  const { velocity, distance } = await startEngine(id);
  const car = document.getElementById(`car${id}`) as HTMLElement;
  const flag = document.querySelector(`.flag${id}`) as HTMLElement;
  const pass = getDistanse(car, flag) + 95;
  const time = Math.round(distance / velocity);
  storeAnimation[id] = animation(car, pass, time);
  const { success } = await drive(id);
  if (!success) window.cancelAnimationFrame(storeAnimation[id].id);
  return { success, id, time };
};

export const stop = async (id: number): Promise<void> => {
  (document.getElementById(`stop${id}`) as HTMLButtonElement).disabled = true;
  (document.getElementById(`start${id}`) as HTMLButtonElement).disabled = false;
  await stopEngine(id);
  const car = document.getElementById(`car${id}`) as HTMLElement;
  car.style.marginLeft = '0';
  if (storeAnimation[id]) {
    window.cancelAnimationFrame(storeAnimation[id].id);
  }
};
