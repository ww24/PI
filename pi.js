function PI(times, delta, callback) {
  var pi = 0,
      index = 0,
      piArr;

  for (var n = 0; n < times; n++) {
    pi += (n % 2 === 0 ? 1 : -1) * 4 / (n * 2 + 1);
    if (delta) {
      index = n % delta;
      if (index === 0)
        piArr = new Float64Array(delta);
      piArr[index] = pi;
    }
    if (callback)
      callback(n, pi, piArr);
  }

  return pi;
}

self.addEventListener("message", function (e) {
  var times = e.data + 1,
      delta = 10000000,
      prePI = 0;

  PI(times, delta, function (n, pi, piArr) {
    if (n === times - 2)
      prePI = pi;
    else if (n === times - 1)
      self.postMessage({
        progress: ~~(n / 10000000) + 1,
        n: n,
        nextPI: pi,
        PI: prePI,
        PIArr: piArr,
        end: true
      });
    else if (n % delta === 9999999)
      self.postMessage({
        progress: ~~(n / 10000000) + 1,
        n: n,
        PI: pi,
        PIArr: piArr,
        end: false
      });
  });
});
