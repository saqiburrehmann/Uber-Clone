import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import StartScreen from "./pages/StartScreen";
import HomeScreen from "./pages/HomeScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              isAuthenticated={!!token}
              redirectPath="/user-login"
            >
              <HomeScreen />
            </ProtectedRoute>
          }
        />

        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App;
