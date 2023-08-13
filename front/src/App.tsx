import { Provider } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import { setupStore } from "./store/store";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
