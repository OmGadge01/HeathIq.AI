import { Routes, Route, useNavigate } from "react-router-dom";
import HealthForm from "./components/LandingPage/HealthForm.jsx";
import Hero_section from "./components/LandingPage/Hero_section.jsx";
import Navbar from "./components/LandingPage/Navbar.jsx";
import DashBoardNavbar from "./components/Dashboard/DashboardNavbar.jsx";
import DashboardPage from "./components/Dashboard/DashboardPage.jsx";
import ExercisePage from "./components/RecommendationPage/ExercisePage.jsx";
import DietPage from "./components/RecommendationPage/DietPage.jsx";
import HowItWorks from "./components/LandingPage/HowItWorks.jsx";
// Removed unused import

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="relative h-screen overflow-hidden">
            <Navbar />
            <LandingPage />
           
          </div>
        }
      />

      <Route
        path="/form"
        element={
          <>
            <Navbar />
            <HealthForm />
          </>
        }
      />
      <Route
        path="/howitworks"
        element={
          <>
            <HowItWorks/>
          </>
        }
      />

      <Route
        path="/dashboard"
        element={
          <>
          <DashBoardNavbar />
            <DashboardPage />
          </>
        }
      />

      <Route
        path="/dashboard/Exercise"
        element={
          <>
            <DashBoardNavbar />
            <ExercisePage />
          </>
        }
      />

      <Route
        path="/dashboard/Diet"
        element={
          <>
            <DashBoardNavbar />
            <DietPage />
          </>
        }
      />
    </Routes>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/form");
  };

  const handleHowItWorks = () => {
    navigate("/howitworks");
  };

  return (
    <>
      <Hero_section 
        onGetStarted={handleGetStarted}
        onHowItWorks={handleHowItWorks}
      />
    </>
  );
}


export default App;
