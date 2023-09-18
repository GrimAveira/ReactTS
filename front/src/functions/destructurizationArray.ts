import { IEmployee, IEmployeeWithApp } from "../interface";

export default function destructurizationArray(array: IEmployeeWithApp[]): {
  [key: string]: IEmployee[];
} {
  return array.reduce(
    (
      obj: {
        [key: string]: IEmployee[];
      },
      app: IEmployeeWithApp
    ) => ({
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
