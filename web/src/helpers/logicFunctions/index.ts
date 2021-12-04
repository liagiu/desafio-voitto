import { useIsFocusVisible } from '@material-ui/core';

export const getNoFibonacciNumber = (n: number) => {
  let prev2 = 1,
    prev1 = 2,
    fib = 3;

  while (n > 0) {
    prev2 = prev1;
    prev1 = fib;
    fib = prev2 + prev1;
    n -= prev2 - 1;
  }
  n += prev2 - 1;
  return n + prev1;
};
