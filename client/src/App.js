import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ContactPage from "./pages/Contact"; // Import the Contact Page

function App() {
  return (
    <>
      <Routes>
        {/* Route principale */}
        <Route path="/" element={<HomePage />} />
        
        {/* Authentification */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Pages statiques */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} /> {/* Add Contact Page route */}
        
        {/* Page non trouvée */}
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
