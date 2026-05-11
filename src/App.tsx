import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path={`/:menuItem`} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
