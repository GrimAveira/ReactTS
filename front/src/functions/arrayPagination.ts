export default function arrayPagination(array = [], limit: number) {
  let first = 0;
  let second = limit;
  let pagArray: any[] = [];
  while (second < array.length + limit) {
    pagArray = [...pagArray, array.slice(first, second)];
    first += second;
    second += second;
  }
  return pagArray;
}
