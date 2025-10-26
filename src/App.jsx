import { Routes, Route, useNavigate } from "react-router-dom";
import Userform from "./frontend/Components/Landingpage/Userform.jsx";
import Hero_section from "./frontend//Components/Landingpage/hero_section";
import Navbar from "./frontend//Components/Landingpage/Navbar";
import DashBoardNavbar from "./frontend//Components/Dashboard/DashboardNavbar.jsx";
import DashboardPage from "./frontend//Components/Dashboard/DashboardPage";
// import WithNavbarLayout from './layouts/WithNavbarLayout'
import ExercisePage from "./frontend//Components/RecommendationPage/ExercisePage.jsx";
import DietPage from "./frontend/Components/RecommendationPage/DietPage.jsx";
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
            <Userform />
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
