import styles from "../css/components/Filters.module.css";
import FormSelectApp from "./UI/SelectForm";
import FormInput from "./UI/InputFormLabel";
import InputForm from "./UI/InputForm";

function Filters({
  statuses,
  selectHandler,
  inputHandler,
}: {
  statuses: { id: number; name: string }[];
  selectHandler: any;
  inputHandler: any;
}) {
  const select = {
    placeholder: "Статус заявки",
    required: true,
    options: statuses.map((status) => {
      return { value: status.name, label: status.name };
    }),
    defaultValue: {
      value: 2,
      label: "Завершена",
    },
  };
  const inputs = [
    {
      text: "Начальное значение интервала даты создания:",
      name: "start_date",
      type: "date",
      required: true,
    },
    {
      text: "Конечное значение интервала даты создания:",
      name: "finish_date",
      type: "date",
      required: true,
    },
  ];
  return (
    <div className={styles.container}>
      <FormSelectApp {...select} onChange={selectHandler} />
      {inputs.map((input) => (
        <div key={input.name} style={{ display: "flex" }}>
          <div className={styles.text}>{input.text}</div>
          <InputForm {...input} onChange={inputHandler} />
        </div>
      ))}
    </div>
  );
}

export default Filters;
