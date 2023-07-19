// src/stores/money.ts
import { derived, writable } from 'svelte/store';
import { timer } from './timer';

export const rate = writable(100); // Add rate store

export const money = derived(
  [timer.realTimeElapsed, rate],
  ([$realTimeElapsed, $rate]: [number, number], set: (value: number) => void) => {
    const moneyValue = ($realTimeElapsed / 1000) * ($rate / 60 / 60);
    set(moneyValue);
  },
  0
);

export const lastMoney = derived(
  [timer.lastTimeSeen, rate],
  ([$lastTimeSeen, $rate]: [number, number], set: (value: number) => void) => {
    const moneyValue = ($lastTimeSeen / 1000) * ($rate / 60 / 60);
    set(moneyValue);
  },
  0
);