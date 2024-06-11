export const sleepInDev = (time) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      return resolve();
    }, time * 1000)
  );
};
