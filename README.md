# bisect.js

A demonstration of how to solve equations using interval
bisection and a practical application of the interval
theorem. Example:

```js
var f = function(x) {
  return (Math.pow(x, 2) - 1);
};

bisect.solve(f);
```
