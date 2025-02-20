import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import AdminEditorPage from "../pages/AdminEditorPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin_editor" element={<AdminEditorPage />} />
    </Routes>
  );
}
