export default function arrayPagination<T>(array: T[], limit: number): T[][] {
  let first = 0;
  let second = limit;
  let pagArray: T[][] = [];
  while (second < array.length + limit) {
    pagArray = [...pagArray, array.slice(first, second)];
    first += second;
    second += second;
  }
  return pagArray;
}
