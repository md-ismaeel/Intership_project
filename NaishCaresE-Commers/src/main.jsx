import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./Redux/store/store.js"
import { Provider } from "react-redux";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));

root.render(
    <>
        <Provider store={store}>
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
        </Provider>
    </>
);
