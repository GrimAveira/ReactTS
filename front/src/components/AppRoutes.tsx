import {
  publicNotShellRoutes,
  publicShellRoutes,
  privateShellRoutes,
} from "../router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "../App.module.css";
import Shell from "./Shell";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { checkAuth } from "../store/reducers/ActionCreators";

function AppRoutes() {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(checkAuth(localStorage.getItem("token")));
  }, [dispatch]);
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
            {authInfo.isAuth &&
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
