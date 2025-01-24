import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import UtilitiesProvider from "./provider/UtilitiesProvider";
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UtilitiesProvider>
        <RouterProvider router={router} />
      </UtilitiesProvider>
    </AuthProvider>
  </StrictMode>
);
