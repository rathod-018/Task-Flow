import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  SignUp,
  VerifyOtp,
  CreateProject,
  LogIn,
  Welcome,
} from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/create-project" element={<CreateProject />} />
    </Routes>
  );
}

export default App;
