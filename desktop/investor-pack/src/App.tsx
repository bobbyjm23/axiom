import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ConfidentialityPage } from "./pages/ConfidentialityPage";
import { ExplorerPage } from "./pages/ExplorerPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ConceptPage } from "./pages/ConceptPage";
import { PitchDeckPage } from "./pages/PitchDeckPage";
import "./styles/theme.css";
import "./styles/explorer.css";

export function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confidentiality" element={<ConfidentialityPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/concept"
            element={
              <ProtectedRoute>
                <ConceptPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pitch-deck"
            element={
              <ProtectedRoute>
                <PitchDeckPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explorer"
            element={
              <ProtectedRoute>
                <ExplorerPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
