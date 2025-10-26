import { Routes, Route, useNavigate } from "react-router-dom";
import Userform from "./frontend/Components/Landing page/Userform.jsx";
import Hero_section from "./frontend//Components/Landing page/hero_section";
import Navbar from "./frontend//Components/Landing page/Navbar";
import DashBoardNavbar from "./frontend//Components/Dashboard/DashboardNavbar.jsx";
import DashboardPage from "./frontend//Components/Dashboard/DashboardPage";
// import WithNavbarLayout from './layouts/WithNavbarLayout'
import ExercisePage from "./frontend//Components/RecommendationPage/ExercisePage.jsx";
import DietPage from "./frontend/Components/RecommendationPage/DietPage.jsx";
// import FitnessProfileForm from './frontend/Landing page/form.jsx'

function App() {
  return (
    <Routes>
      // Landing Page Route
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <LandingPage />
          </>
        }
      />
      // User data form Route
      <Route
        path="/form"
        element={
          <>
            <Navbar />
            <Userform />
          </>
        }
      />
      // Dashboard Route
      <Route
        path="/dashboard"
        element={
          <>
            <DashboardPage />
          </>
        }
      />
      // Exercise Recommendation Routes
      <Route
        path="/dashboard/Exercise"
        element={
          <>
            <DashBoardNavbar />
            <ExercisePage />
          </>
        }
      />
      // Diet Recommendation Route
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
