import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./App.css";
import Rutas from "./routes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <Header />
          <Rutas />
          <Footer />
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
