import { IEmployee } from "../interface";

export default function destructurizationArray(array: []) {
  return array.reduce(
    (obj: {}, app: IEmployee) => ({
      ...obj,
      [app.application_number]: [
        ...(obj[app.application_number as keyof typeof obj] || []),
        {
          personnel_number: app.personnel_number,
          name: app.name,
          surname: app.surname,
          patronymic: app.patronymic,
          post: app.post,
        },
      ],
    }),
    {}
  );
}
