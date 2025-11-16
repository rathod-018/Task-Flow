import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import CreateBoard from "./pages/CreateBoard";
import Protected from "./components/Protected";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard>
              
            </Dashboard>
          </Protected>
        }
      />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route
        path="/board"
        element={
          <Protected>
            <CreateBoard />
          </Protected>
        }
      />
    </Routes>
  );
}

export default App;
