import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";

import App from "./App";
import "./index.css";

import { IncidentProvider } from "./context/IncidentContext";
import {
  DispatchSimulationProvider,
} from "./context/DispatchSimulationContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkspaceProvider>
        <IncidentProvider>
          <DispatchSimulationProvider>
            <App />

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#111B2E",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.1)",
                },
              }}
            />
          </DispatchSimulationProvider>
        </IncidentProvider>
      </WorkspaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);