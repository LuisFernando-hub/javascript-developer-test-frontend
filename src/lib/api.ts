export type Game = {
  id: string | number;
  title: string;
  provider?: string;
  startUrl?: string;
  thumb?: {
    url?: string;
  };
};

export type SlotBalance = {
  balance: number;
};

export type SlotSpin = {
  result: string[];
  reward: number;
  netChange: number;
  balance: number;
};

export type CurrencyConversion = {
  amount: number;
  currency: string;
  convertedAmount: number;
  rate: number;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? 'Request failed');
  }

  return data;
}

export function getGames(search = '') {
  const query = search.trim();
  const endpoint = query
    ? `/api/games/search?search=${encodeURIComponent(query)}`
    : '/api/games';

  return request<Game[]>(buildApiUrl(endpoint));
}

export function getSlotBalance() {
  return request<SlotBalance>(buildApiUrl('/api/slot/balance'));
}

export function spinSlot() {
  return request<SlotSpin>(buildApiUrl('/api/slot/spin'), {
    method: 'POST'
  });
}

export function convertBalance(amount: number, currency: string) {
  return request<CurrencyConversion>(buildApiUrl('/api/balance/convert'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount,
      currency
    })
  });
}
