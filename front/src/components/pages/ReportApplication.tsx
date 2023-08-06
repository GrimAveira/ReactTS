// import React, { useEffect, useState } from "react";
// import ManagerApplicationHeader from "../ManagerApplicationHeader";
// import axios from "axios";
// import styles from "../../css/pages/ReportApplication.module.css";
// import Filters from "../Filters";
// import ReportApplicationForm from "../ReportApplicationForm";
// import Pagination from "../Pagination";
// import arrayPagination from "../..//functions/arrayPagination";
// import destructurizationArray from "../../functions/destructurizationArray";

// function ReportApplication() {
//   const [filter, setFilter] = useState({
//     status: "Завершена",
//     start_date: "2000-1-1",
//     finish_date: "2030-1-1",
//   });
//   const [statuses, setStatuses] = useState([""]);
//   const [employeesApp, setEmployees] = useState({});
//   const [counter, setCounter] = useState(0);
//   const [pagApps, setPagApps] = useState([[]]);

//   useEffect(() => {
//     const controller = new AbortController();
//     axios
//       .get("http://localhost:8800/api/get/status", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         signal: controller.signal,
//       })
//       .then((response) => {
//         setStatuses(response.data);
//       })
//       .catch((err) => console.log(err));
//     axios
//       .get("http://localhost:8800/api/get/employeeApplication", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         signal: controller.signal,
//       })
//       .then((response) => {
//         setEmployees(destructurizationArray(response.data));
//       })
//       .catch((err) => console.log(err));
//     return () => {
//       controller.abort();
//     };
//   }, []);
//   useEffect(() => {
//     const controller = new AbortController();
//     axios
//       .get("http://localhost:8800/api/get/filterApp", {
//         params: filter,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         signal: controller.signal,
//       })
//       .then((response) => {
//         setPagApps(arrayPagination(response.data, 3));
//       })
//       .catch((err) => alert("массивы"));
//     return () => {
//       controller.abort();
//     };
//   }, [filter]);

//   const selectHandler = (newValue) => {
//     setFilter((prev) => ({
//       ...prev,
//       status: newValue.value,
//     }));
//     setCounter(0);
//   };
//   const inputHandler = (event) => {
//     setFilter((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };
//   return (
//     <div className={styles.container}>
//       <div className={styles.reports}>
//         <ManagerApplicationHeader />
//         <Filters
//           selectHandler={selectHandler}
//           inputHandler={inputHandler}
//           statuses={statuses}
//         />
//         {pagApps[counter].map((app) => (
//           <ReportApplicationForm
//             key={app.id}
//             {...app}
//             employees={employeesApp[app.id]}
//             area={app.area}
//             street={app.street}
//             house={app.house}
//             entrance={app.entrance}
//           />
//         ))}
//       </div>
//       <Pagination
//         counter={counter}
//         length={pagApps.length}
//         setCounter={setCounter}
//       />
//     </div>
//   );
// }

// export default ReportApplication;
