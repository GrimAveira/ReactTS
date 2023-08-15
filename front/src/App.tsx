import { Provider } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import { setupStore } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppRoutes />
    </Provider>
  );
}

export default App;
