import { each } from '@antv/util';

export function rgb2arr(str) {
  const arr = [];
  arr.push(parseInt(str.substr(1, 2), 16));
  arr.push(parseInt(str.substr(3, 2), 16));
  arr.push(parseInt(str.substr(5, 2), 16));
  return arr;
}

export function toHex(value) {
  let v;
  v = Math.round(value);
  v = v.toString(16);
  if (v.length === 1) {
    v = `0${value}`;
  }
  return v;
}

export function arr2rgb(arr) {
  return `#${toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2])}`;
}

export function mappingColor(band, gray) {
  let reflect;
  each(band, (b) => {
    const map = b;
    if (gray >= map.from && gray < map.to) {
      reflect = map.color;
    }
  });
  return reflect;
}
