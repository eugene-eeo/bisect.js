(function (global) {
  'use strict';

  // context {
  //     expr: function (Number) -> Number,
  //     roots: {Number: null, ...},
  //     ranges: [[lo, hi], ...],
  // }

  function bisect(ctx) {
    var expr = ctx.expr;
    var roots = ctx.roots;
    var ranges = ctx.ranges;
    var newRanges = [];
    var i;

    for (i = 0; i < ranges.length; i++) {
      var range = ranges[i];
      var lo = range[0];
      var hi = range[1];
      var md = (hi + lo) / 2; // midpoint of lo and hi

      // Optimisation: only calculate the values once
      // per iteration.
      var a = expr(lo);
      var b = expr(hi);
      var c = expr(md);

      // Test if any of a, b, or c are roots of the
      // function. If they are, push them into the
      // "set" of roots.
      if (a === 0) roots[lo] = null;
      if (b === 0) roots[hi] = null;
      if (c === 0) roots[md] = null;

      // If there is a root between midpoint and lower
      // bound, push those ranges into the search space.
      if ((a * c) <= 0) newRanges.push([lo, md]);
      if ((b * c) <= 0) newRanges.push([md, hi]);
    };

    ctx.ranges = newRanges;
  }

  function rootsOf(ctx) {
    // Copy the already found roots into a new array,
    // and then for each range find the mean value
    // and push it onto the results array.
    var ext = ctx.roots;
    var res = Object.keys(ext);
    var i;
    for (i = 0; i < ctx.ranges.length; i++) {
      var r = ctx.ranges[i];
      var a = r[0];
      var b = r[1];
      var m = (a + b) / 2;
      if (!ext.hasOwnProperty(m)) res.push(m);
    }
    return res;
  }

  // Finally, export the functions
  global.bisect = bisect;
  global.rootsOf = rootsOf;
})(this);
