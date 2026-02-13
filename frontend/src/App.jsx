import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";

function App() {
  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
  );
}

export default App;
