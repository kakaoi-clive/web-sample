export const delay = (timeout) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, timeout);
  });
};
