export default function unique(target: any[], signal = "id") {
  const tmp = {} as any;
  const array = [] as any[];
  for (const tar in target) {
    tmp[target[tar][signal]] = target[tar];
  }

  for (const item in tmp) {
    array.push(tmp[item]);
  }

  return array;
}
