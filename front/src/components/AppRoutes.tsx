import { useState } from "react";
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
import { AuthContext } from "../context/AuthContext";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const toggleIsAuthFalse = () => {
    setIsAuth(false);
  };
  const toggleIsAuthTrue = () => {
    setIsAuth(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/auth/check", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setIsAuth(true);
      })
      .catch((err) => {
        if (err.response.data.message === "jwt expired") {
          localStorage.clear();
          alert("Сессия истекла");
        }
        console.log(err);
      });
  }, []);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AuthContext.Provider
          value={{
            isAuth: isAuth,
            toggleIsAuthFalse: toggleIsAuthFalse,
            toggleIsAuthTrue: toggleIsAuthTrue,
          }}
        >
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
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
