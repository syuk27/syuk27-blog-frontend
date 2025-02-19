import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AdminPost from "../pages/AdminPost";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin_post" element={<AdminPost />} />
    </Routes>
  );
}
