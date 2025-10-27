import { Routes, Route, useNavigate } from "react-router-dom";
import HealthForm from "../frontend/components/LandingPage/HealthForm.jsx";
import Hero_section from "../frontend/components/Landingpage/hero_section.jsx";
import Navbar from "../frontend/components/Landingpage/Navbar.jsx";
import DashBoardNavbar from "../frontend/components/Dashboard/DashboardNavbar.jsx";
import DashboardPage from "../frontend/components/Dashboard/DashboardPage.jsx";
// import WithNavbarLayout from './layouts/WithNavbarLayout'
import ExercisePage from "../frontend/components/RecommendationPage/ExercisePage.jsx";
import DietPage from "../frontend/components/RecommendationPage/DietPage.jsx";
// import FitnessProfileForm from './frontend/Landingpage/form.jsx'

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
