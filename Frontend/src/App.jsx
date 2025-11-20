import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Protected from "./components/Protected";
import WorkFlowCard from "./components/projects/workFlow/WorkFlowCard";
import ListCard from "./components/projects/list/ListHeader";
import SummaryStatus from "./components/projects/summary/SummaryStats";
import { ProjectContextProvider } from "./context/ProjectContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      <Route element={<Protected />}>
        <Route
          path="/home"
          element={
            <ProjectContextProvider>
              <Home />
            </ProjectContextProvider>
          }
        >
          <Route path="work-flow" index element={<WorkFlowCard />} />
          <Route path="list" element={<ListCard />} />
          <Route path="summary" element={<SummaryStatus />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
