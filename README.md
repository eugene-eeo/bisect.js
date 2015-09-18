# bisect.js

A demonstration of how to solve equations using interval
bisection and a practical application of the interval
theorem. Example setup:

```js
var f = function(x) {
  return (Math.pow(x, 2) - 1);
};

var ctx = {
  expr: f,
  roots: {},
  ranges: [[-100, 100]],
};
```

And then call **bisect(ctx)** as many times as needed.
For example:

```js
for (var i = 0; i < 100; i++)
  bisect(ctx);
console.log(rootsOf(ctx));
```
