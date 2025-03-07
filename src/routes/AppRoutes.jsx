import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import SignInPage from "../pages/SignPage/SignInPage";
import SignupPage from "../pages/SignPage/SignupPage";
import BlogPostsPage from "../pages/postPage/BlogPostsPage";
import AdminEditorPage from "../pages/postPage/AdminEditorPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogPostsPage />} />
        <Route path="/admin_editor" element={<AdminEditorPage />} />
        <Route path="/blog_posts" element={<BlogPostsPage />} />
        <Route path="/sign_in" element={<SignInPage />} />
        <Route path="/sign_up" element={<SignupPage />} />
      </Route>
    </Routes>
  );
}
