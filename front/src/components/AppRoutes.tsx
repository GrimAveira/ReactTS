import {
  publicNotShellRoutes,
  publicShellRoutes,
  privateShellRoutes,
} from "../router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "../App.module.css";
import Shell from "./Shell";
import { useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../hooks/redux";
import { changeIsAuth } from "../store/reducers/AuthSlice";

function AppRoutes() {
  const isAuth = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    axios
      .get("http://localhost:8800/api/auth/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        changeIsAuth(true);
      })
      .catch((err) => {
        if (err.response.data.message === "jwt expired") {
          localStorage.clear();
          alert("Сессия истекла");
        }
      });
  }, []);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route element={<Shell />}>
            {publicShellRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            {isAuth &&
              privateShellRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
          </Route>
          {publicNotShellRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
