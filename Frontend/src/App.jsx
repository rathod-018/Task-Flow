import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Protected from "./components/Protected";
import WorkFlow from "./components/workFlow/WorkFlow";
import List from "./components/list/List";
import Summary from "./components/summary/Summary";
import { ProjectContextProvider } from "./context/ProjectContext";
import { TaskContextProvider } from "./context/TaskContext";
import { BoardContextProvider } from "./context/BoardContext";

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
            <BoardContextProvider>
              <ProjectContextProvider>
                <TaskContextProvider>
                  <Home />
                </TaskContextProvider>
              </ProjectContextProvider>
            </BoardContextProvider>
          }
        >
          <Route path="work-flow" index element={<WorkFlow />} />
          <Route path="list" element={<List />} />
          <Route path="summary" element={<Summary />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
