// import React, { useEffect, useState } from "react";
// import styles from "../../css/pages/PDF.module.css";
// import { BsDownload } from "react-icons/bs";
// import axios from "axios";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import FormSelectApp from "../FormSelectApp";

// function printDocument() {
//   const input = document.getElementById("divToPrint");
//   html2canvas(input).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF();
//     pdf.addImage(imgData, "JPEG", 0, 0);
//     pdf.save("Заявка.pdf");
//   });
// }

// function PDF() {
//   const [application, setApplication] = useState({
//     userName: "",
//     userPatronymic: "",
//   });
//   const [appId, setAppId] = useState("1");
//   const [employees, setEmployees] = useState([]);
//   const [applicationsId, setApplicationsId] = useState([]);
//   const [applicant, setApplicant] = useState("");

//   useEffect(() => {
//     const controller = new AbortController();
//     try {
//       axios
//         .get("http://localhost:8800/api/get/application", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           signal: controller.signal,
//         })
//         .then((response) => {
//           response.data.forEach((app) => {
//             if (app.id === Number(appId)) {
//               setApplication(app);
//             }
//           });
//           setApplicationsId(
//             response.data
//               .map((app) => app.id)
//               .sort((a, b) => {
//                 return Number(a) - Number(b);
//               })
//           );
//         })
//         .catch((error) => alert(error.response.data));
//       axios
//         .get("http://localhost:8800/api/get/employeeView", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           signal: controller.signal,
//         })
//         .then((response) => {
//           let employees = [];
//           response.data.forEach((emp) => {
//             if (emp.application_number === Number(appId)) employees.push(emp);
//           });
//           setEmployees(employees);
//         })
//         .catch((error) => alert(error.response.data));
//     } catch (error) {
//       alert(error);
//     }
//     return () => {
//       controller.abort();
//     };
//   }, [appId]);
//   const changeHandler = (newValue) => {
//     setAppId(newValue.value);
//   };
//   useEffect(() => {
//     setApplicant(
//       `${application.userSurname} ${application.userName.substring(
//         0,
//         1
//       )}.${application.userPatronymic.substring(0, 1)}.`
//     );
//   }, [
//     application.userPatronymic,
//     application.userName,
//     application.userSurname,
//   ]);

//   let select = {
//     placeholder: "Номер заявки",
//     label: "Выберите номер заявки для печати",
//     required: true,
//     options: applicationsId.map((id) => {
//       return { value: id, label: id };
//     }),
//     defaultValue: { value: 1, label: 1 },
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.pdf}>
//         <form id="divToPrint">
//           <div className={styles.application}>
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Номер заявки</td>
//                   <td>{application.id}</td>
//                 </tr>
//                 <tr>
//                   <td>Дата создания заявки</td>
//                   <td>{application.start_date}</td>
//                 </tr>
//                 <tr>
//                   <td>Дата завершения заявки</td>
//                   <td>{application.finish_date}</td>
//                 </tr>
//                 <tr>
//                   <td>Тип заявки</td>
//                   <td>{application.type}</td>
//                 </tr>
//                 <tr>
//                   <td>Тип поломки</td>
//                   <td>{application.breaking}</td>
//                 </tr>
//                 <tr>
//                   <td>Описание</td>
//                   <td>{application.description}</td>
//                 </tr>
//                 <tr>
//                   <td>Статус</td>
//                   <td>{application.status}</td>
//                 </tr>
//                 <tr>
//                   <td>Серийный номер лифта</td>
//                   <td>{application.elevator}</td>
//                 </tr>
//                 <tr>
//                   <td>Заявитель</td>
//                   <td>{applicant}</td>
//                 </tr>
//                 <tr>
//                   <td>Адрес</td>
//                   <td>{`${application.area} район, ${application.street} улица, дом ${application.house} подъезд ${application.entrance}`}</td>
//                 </tr>
//                 <tr>
//                   <td>Сотрудники</td>
//                   <td>
//                     {employees
//                       ? employees.map((emp) => (
//                           <div key={emp.personnel_number}>
//                             {`${emp.surname} ${emp.name.substring(
//                               0,
//                               1
//                             )}.${emp.patronymic.substring(0, 1)}. Должность: ${
//                               emp.post
//                             }.`}
//                           </div>
//                         ))
//                       : "Сотрудники не закреплены"}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className={styles.text}>Номер заявки для печати:</div>
//             <div className={styles.input}>
//               <FormSelectApp {...select} onChange={changeHandler} />
//             </div>
//           </div>
//         </form>
//         <BsDownload
//           className={styles.button}
//           type="submit"
//           onClick={printDocument}
//         />
//       </div>
//     </div>
//   );
// }

// export default PDF;
