export {NaturalCubicSpline, ClampedCubicSpline, MonotoneCubicSpline}

function NaturalCubicSpline(xSeries, ySeries, numSeg){

  let n = xSeries.length;
  let alpha = new Array(n).fill(0);
  let h = new Array(n).fill(0);
  let l = new Array(n).fill(0);
  let u = new Array(n).fill(0);
  let z = new Array(n).fill(0);
  let c = new Array(n).fill(0);
  let b = new Array(n).fill(0);
  let d = new Array(n).fill(0);
  let x, inc, diff, Sx, devSx, dev2Sx;
  let Results = new Array((n-1)*numSeg);
  let k = 0;
  n = n - 1;
  //Step1 : Set h
  for (let i = 0; i < n; i++) {
    h[i] = xSeries[i+1] - xSeries[i]
  }
  //Step2 : Set alpha
  for (let i = 1; i < n; i++) {
    alpha[i] = 3 / h[i] * (ySeries[i+1] - ySeries[i]) - 3 / h[i-1] * (ySeries[i] - ySeries[i-1])
  }
  //Step3 : Set l0, u0, z0
  l[0] = 1.0;
  u[0] = 0.0;
  z[9] = 0.0;
  //Step4 ; Set li, ui, zi
  for (let i = 1; i < n; i++) {
    l[i] = 2 * (xSeries[i+1] - xSeries[i-1]) - h[i-1] * u[i-1];
    u[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i-1] * z[i-1]) / l[i];
  }
  //Step5 : Set ln, zn, cn
  l[n] = 1.0;
  z[n] = 0.0;
  c[n] = 0.0;
  //Step6 : Set ci, bi, di
  for (let i = n-1; i >= 0; i--) {
    c[i] = z[i] - u[i] * c[i + 1];
    b[i] = (ySeries[i + 1] - ySeries[i]) / h[i] - h[i] * (c[i + 1] + 2 * c[i]) / 3;
    d[i] = (c[i + 1] - c[i]) / (3 * h[i]);
  }
  //Interpolation

  for (let i = 0; i < n; i++) {
    x = xSeries[i];
    inc = (xSeries[i + 1] - xSeries[i]) * (1 / numSeg);
    for (let j = 0; j < numSeg; j++) {
      diff = x - xSeries[i];
      Sx = ySeries[i] + b[i] * diff + c[i] * Math.pow(diff, 2) + d[i] * Math.pow(diff, 3);
      devSx = b[i] + 2 * c[i] * diff + 3 * d[i] * Math.pow(diff, 2);
      dev2Sx = 2 * c[i] + 6 * d[i] * diff;
      Results[k] = [x, Sx, devSx, dev2Sx];
      x = x + inc;
      k = k + 1;
    }
  }
  diff = xSeries[n] - xSeries[n - 1];
  Sx = ySeries[n - 1] + b[n - 1] * diff + c[n - 1] * Math.pow(diff, 2) + d[n - 1] * Math.pow(diff, 3);
  devSx = b[n - 1] + 2 * c[n - 1] * diff + 3 * d[n - 1] * Math.pow(diff, 2);
  dev2Sx = 2 * c[n - 1] + 6 * d[n - 1] * diff;
  Results[k] = [x, Sx, devSx, dev2Sx];

  return Results
}

function ClampedCubicSpline(xSeries, ySeries, numSeg, FPO, FPN) {

  let n = xSeries.length;
  let alpha = new Array(n).fill(0);
  let h = new Array(n).fill(0);
  let l = new Array(n).fill(0);
  let u = new Array(n).fill(0);
  let z = new Array(n).fill(0);
  let c = new Array(n).fill(0);
  let b = new Array(n).fill(0);
  let d = new Array(n).fill(0);
  let x, inc, diff, Sx, devSx, dev2Sx;
  let Results = new Array((n-1)*numSeg);
  let k = 0;
  n = n - 1;
  //Step1: Set h
  for (let i = 0; i < n; i++) {
    h[i] = xSeries[i+1] - xSeries[i];
  }
  //Step2: Set alpha0, alphan
  alpha[0] = 3 * (ySeries[1] - ySeries[0]) / h[0] - 3 *FPO;
  alpha[n] = 3 * FPN - 3 * (ySeries[n] - ySeries[n-1]) / h[n-1];
  //Step3: Set alpha
  for (let i = 1; i < n; i++) {
    alpha[i] = 3 / h[i] * (ySeries[i+1] - ySeries[i]) - 3 / h[i-1] * (ySeries[i] - ySeries[i-1]);
  }
  //Step4: Set l0, u0, z0
  l[0] = 2 * h[0];
  u[0] = 0.5;
  z[0] = alpha[0] / l[0];
  //Step5: Set li, ui, zi
  for (let i = 1; i < n; i++) {
    l[i] = 2 * (xSeries[i+1] - xSeries[i-1]) - h[i-1] * u[i-1];
    u[i] = h[i] / l[i];
    z[i] = (alpha[i] - h[i-1] * z[i-1]) / l[i];
  }
  //Step6: Set ln, zn, cn
  l[n] = h[n-1] * (2 - u[n-1]);
  z[n] = (alpha[n] - h[n-1] * z[n-1]) / l[n];
  c[n] = z[n];
  //Step7: Set ci, bi, di
  for (let i = n-1; i >= 0; i--) {
    c[i] = z[i] - u[i] * c[i+1];
    b[i] = (ySeries[i+1] - ySeries[i]) / h[i] - h[i] * (c[i+1] + 2 * c[i]) / 3 ;
    d[i] = (c[i+1] - c[i]) / (3 * h[i]);
  }
  //Interpolation
  for (let i = 0; i < n; i++) {
    x = xSeries[i];
    inc = (xSeries[i+1] - xSeries[i]) * (1/numSeg);
    for (let j = 0; j < numSeg; j++) {
      diff = x - xSeries[i];
      Sx = ySeries[i] + b[i] * diff + c[i] * Math.pow(diff, 2) + d[i] * Math.pow(diff, 3);
      devSx = b[i] + 2 * c[i] * diff + 3 * d[i] * Math.pow(diff, 2);
      dev2Sx = 2 * c[i] + 6 * d[i] * diff;
      Results[k] = [x, Sx, devSx, dev2Sx];
      x = x + inc;
      k = k + 1;
    }
  }
  diff = xSeries[n] - xSeries[n - 1];
  Sx = ySeries[n - 1] + b[n - 1] * diff + c[n - 1] * Math.pow(diff, 2) + d[n - 1] * Math.pow(diff, 3);
  devSx = b[n - 1] + 2 * c[n - 1] * diff + 3 * d[n - 1] * Math.pow(diff, 2);
  dev2Sx = 2 * c[n - 1] + 6 * d[n - 1] * diff;
  Results[k] = [x, Sx, devSx, dev2Sx];

  return Results
}

function MonotoneCubicSpline(xSeries, ySeries, numSeg) {

  let n = xSeries.length;
  let dxs = new Array(n).fill(0);
  let dys = new Array(n).fill(0);
  let ms = new Array(n).fill(0);
  let c1s = new Array(n).fill(0);
  let c2s = new Array(n).fill(0);
  let c3s = new Array(n).fill(0);
  let m, mNext, dx, dxNext, common, c1, m_, invDx, common_;
  let x, inc, diff, Sx, devSx, dev2Sx;
  let Results = new Array((n-1)*numSeg);
  let k = 0;
  n = n - 1;
  //https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
  //Get consecutive differences and slopes
  for (let i = 0; i < n; i++) {
    dxs[i] = xSeries[i+1] - xSeries[i];
    dys[i] = ySeries[i+1] - ySeries[i];
    ms[i] = dys[i] / dxs[i];
  }
  //Get degree-1 coefficients
  c1s[0] = ms[0];
  for (let i = 0; i < n; i++)  {
    m = ms[i];
    mNext = ms[i+1];
    if (m*mNext <= 0) {
      c1s[i+1] = 0
    } else {
      dx = dxs[i];
      dxNext = dxs[i+1];
      common = dx + dxNext;
      c1s[i+1] = 3 * common / ((common + dxNext) / m + (common + dx) / mNext);
    }
  }
  c1s[n] = ms[n-1];
  //Get degree-2 and degree-3 coefficients
  for (let i = 0; i < n; i++) {
    c1 = c1s[i];
    m_ = ms[i];
    invDx = 1 / dxs[i];
    common_ = c1 + c1s[i+1] - m_ - m_;
    c2s[i] = (m_ - c1 - common_) * invDx;
    c3s[i] = common_ * invDx * invDx;
  }
  //Interpolation
  for (let i = 0; i < n; i++) {
    x = xSeries[i];
    inc = (xSeries[i+1] - xSeries[i]) * (1/numSeg);
    for (let j = 0; j < numSeg; j++) {
      diff = x - xSeries[i];
      Sx = ySeries[i] + c1s[i] * diff + c2s[i] * Math.pow(diff, 2) + c3s[i] * Math.pow(diff, 3);
      devSx = c1s[i] + 2 * c2s[i] * diff + 3 * c3s[i] * Math.pow(diff, 2);
      dev2Sx = 2 * c2s[i] + 6 * c3s[i] * diff;
      Results[k] = [x, Sx, devSx, dev2Sx];
      x = x + inc;
      k = k + 1;
    }
  }
  diff = xSeries[n] - xSeries[n - 1];
  Sx = ySeries[n - 1] + c1s[n - 1] * diff + c2s[n - 1] * Math.pow(diff, 2) + c3s[n - 1] * Math.pow(diff, 3);
  devSx = c1s[n - 1] + 2 * c2s[n - 1] * diff + 3 * c3s[n - 1] * Math.pow(diff, 2);
  dev2Sx = 2 * c2s[n - 1] + 3 * c3s[n - 1] * diff;
  Results[k] = [x, Sx, devSx, dev2Sx];

  return Results
}