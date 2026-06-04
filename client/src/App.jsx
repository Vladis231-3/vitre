import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./admin/Login";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import Submissions from "./admin/Submissions";
import ServicesAdmin from "./admin/ServicesAdmin";
import WorksAdmin from "./admin/WorksAdmin";
import ReviewsAdmin from "./admin/ReviewsAdmin";
import CitiesAdmin from "./admin/CitiesAdmin";
import SettingsAdmin from "./admin/SettingsAdmin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="works" element={<WorksAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="cities" element={<CitiesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>
    </Routes>
  );
}
