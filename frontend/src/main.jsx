import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store.js";
import Dashboard from "./pages/Dashboard.jsx";
import Customer from "./pages/Customer.jsx";
import Schedule from "./pages/Schedule.jsx";

// frontend/src/main.jsx
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/schedule" element={<Schedule />} />
    </Route>
  )
);

const theme = createTheme({
  typography: {
    fontFamily: "'Salsa', cursive",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
