import { Routes, Route, useNavigate } from "react-router-dom";
import HealthForm from "./components/LandingPage/HealthForm.jsx";
import Hero_section from "./components/Landingpage/Hero_section.jsx";
import Navbar from "./components/Landingpage/Navbar.jsx";
import DashBoardNavbar from "./components/Dashboard/DashboardNavbar.jsx";
import DashboardPage from "./components/Dashboard/DashboardPage.jsx";
import ExercisePage from "./components/RecommendationPage/ExercisePage.jsx";
import DietPage from "./components/RecommendationPage/DietPage.jsx";

function App() {
  return (
    <Routes>
     
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <LandingPage />
          </>
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
        path="/dashboard"
        element={
          <>
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

  return <Hero_section onGetStarted={handleGetStarted} />;
}

export default App;
