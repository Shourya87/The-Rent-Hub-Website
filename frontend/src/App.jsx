import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import PropertyDetails from "./pages/PropertyDetails";
import Servies from "./pages/Servies";
import About from "./pages/About";
import RentFlat from "./pages/RentFlat";
import ListProperty from "./pages/ListProperty";

function App() {
  return (
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listing />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/rent" element={<RentFlat/>}/>
          <Route path="/services" element={<Servies />} />
          <Route path="/about" element={<About />} />
          <Route path="/list-property" element={<ListProperty/>}/>
        </Route>
      </Routes>
  );
}

export default App;
