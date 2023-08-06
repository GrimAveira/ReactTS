// import styles from "../css/components/Menu.module.css";
// import React from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { Link } from "react-router-dom";

// function Menu({ handleClose, show }) {
//   return (
//     <div className={show ? styles.menuShow : styles.menu}>
//       <div className={styles.blur}>
//         <div className={styles.menu__content}>
//           <div className={styles.menu__header}></div>
//           <AiOutlineClose className={styles.сloseBtn} onClick={handleClose} />
//           <Link to="applications" className={styles.link} onClick={handleClose}>
//             К заявкам
//           </Link>
//           {localStorage.getItem("role") === "1" && (
//             <Link to="/addPanel" className={styles.link} onClick={handleClose}>
//               Редактирование данных
//             </Link>
//           )}
//           {localStorage.getItem("role") === "1" && (
//             <Link to="/pdf" className={styles.link} onClick={handleClose}>
//               Заявки в PDF
//             </Link>
//           )}
//           {localStorage.getItem("role") === "1" && (
//             <Link to="/report" className={styles.link} onClick={handleClose}>
//               Отчет по заявкам
//             </Link>
//           )}
//           <Link to="/accaunt" className={styles.link} onClick={handleClose}>
//             Личный кабинет
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Menu;
export {};
