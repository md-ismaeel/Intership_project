import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./Redux/Store/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PersistGate>
  </Provider>
);
