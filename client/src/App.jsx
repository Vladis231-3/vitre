import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";

const Login = lazy(() => import("./admin/Login"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const Submissions = lazy(() => import("./admin/Submissions"));
const ServicesAdmin = lazy(() => import("./admin/ServicesAdmin"));
const WorksAdmin = lazy(() => import("./admin/WorksAdmin"));
const ReviewsAdmin = lazy(() => import("./admin/ReviewsAdmin"));
const CitiesAdmin = lazy(() => import("./admin/CitiesAdmin"));
const SettingsAdmin = lazy(() => import("./admin/SettingsAdmin"));

function L({c:C,...p}){return <Suspense fallback={<div className="la"/>}><C {...p}/></Suspense>}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<L c={Login} />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
        <Route index element={<L c={Dashboard} />} />
        <Route path="submissions" element={<L c={Submissions} />} />
        <Route path="services" element={<L c={ServicesAdmin} />} />
        <Route path="works" element={<L c={WorksAdmin} />} />
        <Route path="reviews" element={<L c={ReviewsAdmin} />} />
        <Route path="cities" element={<L c={CitiesAdmin} />} />
        <Route path="settings" element={<L c={SettingsAdmin} />} />
      </Route>
    </Routes>
  );
}
