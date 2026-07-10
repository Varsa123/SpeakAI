import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { PracticeProvider } from "./context/PracticeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <ErrorBoundary>
    <AuthProvider>
      <PracticeProvider>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#ffffff",
              border: "1px solid #334155",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </PracticeProvider>
    </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
