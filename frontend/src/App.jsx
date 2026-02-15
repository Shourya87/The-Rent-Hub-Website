import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import PropertyDetails from "./pages/PropertyDetails";
import Servies from "./pages/Servies";
import About from "./pages/About";
import RentFlat from "./pages/RentFlat";
import ListProperty from "./pages/ListProperty";
import AdminPanel from "./pages/admin/AdminPanel";
import { ADMIN_PANEL_PATH, CORE_ENTRY_PATH } from "@/constants/adminAccess";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listing />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/rent" element={<RentFlat />} />
        <Route path="/services" element={<Servies />} />
        <Route path="/about" element={<About />} />
        <Route path="/list-property" element={<ListProperty />} />
        <Route path={CORE_ENTRY_PATH} element={<AdminPanel />} />
        <Route path={ADMIN_PANEL_PATH} element={<Navigate to={CORE_ENTRY_PATH} replace />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
