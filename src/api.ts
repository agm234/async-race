const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

interface CarOBJ {
  color: string;
  id: number;
  name: string;
}

interface Update {
  color: string;
  name: string;
}

interface Cars {
  items: Array<CarOBJ>;
  count: number;
}

interface Createwinner {
  id: number;
  wins: number;
  time: number;
}
interface Save {
  id: number;
  time: number;
}
interface Engine {
  velocity: number;
  distance: number;
}
interface Winners {
  items: Array<Createwinner>;
  count: number;
}

export const getCar = async (id: number): Promise<CarOBJ> => {
  const response = await fetch(`${garage}/${id}`);
  const data = await response.json();
  return data;
};

export const createCar = async (body: Update): Promise<CarOBJ> => {
  const response = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const deleteCar = async (id: number): Promise<void> => {
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
};

export const updateCar = async (id: number, body: Update): Promise<CarOBJ> => {
  const response = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const getCars = async (page: number, limit = 7): Promise<Cars> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}}`);
  return {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
};

export const startEngine = async (id: number): Promise<Engine> => (await fetch(`${engine}?id=${id}&status=started`)).json();
export const stopEngine = async (id: number): Promise<Engine> => (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const response = await fetch(`${engine}?id=${id}&status=drive`).catch();

  return response.status !== 200 ? { success: false } : { ...(await response.json()) };
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async (page: number, limit: 10, sort: string, order: string): Promise<Winners> => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();
  return {
    items: await Promise.all(items.map(async (winner: Createwinner) => ({ ...winner, car: await getCar(winner.id) }))),
    count: Number(response.headers.get('X-Total-Count')),
  };
};

export const getWinner = async (id: number): Promise<Createwinner> => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<void> => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: Createwinner): Promise<void> => (
  await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

export const updateWinner = async (id: number, body: Createwinner): Promise<void> => (
  await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
).json();

export const saveWinner = async ({ id, time }: Save): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
