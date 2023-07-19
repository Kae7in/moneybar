import { writable } from 'svelte/store';

const createTimerStore = () => {
  const { subscribe, update } = writable(0);
  const lastTimeSeen = writable(0);
  const realTimeElapsedStore = writable(0);

  let timer: NodeJS.Timer;
  let realTimeElapsed = 0;
  let lastUpdateTime: number | null = null;

  const tick = () => {
    const currentTime = new Date().getTime();
    if (lastUpdateTime) {
      realTimeElapsed += currentTime - lastUpdateTime;
    }
    lastUpdateTime = currentTime;
    realTimeElapsedStore.set(realTimeElapsed);
    return realTimeElapsed;
  };

  const start = () => {
    tick();
    update((time) => realTimeElapsed);
    timer = setInterval(() => {
      update((time) => tick());
      if (!document.hidden) lastTimeSeen.set(realTimeElapsed);
    }, 100);
  };

  const stop = () => {
    clearInterval(timer);
    lastTimeSeen.set(realTimeElapsed);
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('visibilitychange', handleVisibilityChange);
    start();
  }

  const destroy = () => {  
    if (typeof window !== 'undefined') {  
        window.removeEventListener('visibilitychange', handleVisibilityChange);  
        stop();  
    }  
}; 

  return {
    subscribe,
    lastTimeSeen: lastTimeSeen,
    realTimeElapsed: realTimeElapsedStore,
    start,
    stop,
    destroy,
  };
};

export const timer = createTimerStore();
