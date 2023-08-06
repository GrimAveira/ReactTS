export default function arrayPagination(array = [], limit: number) {
  let first = 0;
  let pagArray: any[] = [];
  while (limit < array.length + limit) {
    pagArray = [...pagArray, array.slice(first, limit)];
    first += limit;
    limit += limit;
  }
  return pagArray;
}
