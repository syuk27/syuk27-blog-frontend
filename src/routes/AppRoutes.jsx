import { Route, Routes } from "react-router-dom";
import AdminEditorPage from "../pages/AdminEditorPage";
import BlogPosts from "../pages/BlogPosts";
import Home from "../pages/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BlogPosts />} />
      <Route path="/admin_editor" element={<AdminEditorPage />} />
      <Route path="/blog_posts" element={<BlogPosts />} />
    </Routes>
  );
}
