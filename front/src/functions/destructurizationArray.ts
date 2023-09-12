import { IEmployee } from "../interface";

export default function destructurizationArray(
  array: IEmployee[]
): Map<Number, IEmployee[]> {
  let destructurizatedArray = new Map<Number, IEmployee[]>();
  array.forEach((employeer) => {
    let tmpArray = destructurizatedArray.get(employeer.application_number);
    if (tmpArray)
      destructurizatedArray.set(employeer.application_number, [
        ...tmpArray,
        {
          personnel_number: employeer.personnel_number,
          name: employeer.name,
          surname: employeer.surname,
          patronymic: employeer.patronymic,
          post: employeer.post,
        },
      ]);
    else
      destructurizatedArray.set(employeer.application_number, [
        {
          personnel_number: employeer.personnel_number,
          name: employeer.name,
          surname: employeer.surname,
          patronymic: employeer.patronymic,
          post: employeer.post,
        },
      ]);
  });
  return destructurizatedArray;
}
