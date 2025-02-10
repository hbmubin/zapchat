import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import UtilitiesProvider from "./provider/UtilitiesProvider";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryclient}>
      <UtilitiesProvider>
        <RouterProvider router={router} />
      </UtilitiesProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
