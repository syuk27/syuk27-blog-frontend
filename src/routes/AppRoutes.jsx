import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import SignInPage from "../pages/SignPage/SignInPage";
import SignupPage from "../pages/SignPage/SignupPage";
import BlogPostsPage from "../pages/postPage/BlogPostsPage";
import AdminEditorPage from "../pages/postPage/AdminEditorPage";
import SignOutPage from "../pages/SignPage/SignOutPage";
import PostDetailPage from "../pages/postPage/PostDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogPostsPage />} />
        <Route path="/admin_editor/v1" element={<AdminEditorPage version="v1"/>} />
        <Route path="/admin_editor/v2" element={<AdminEditorPage version="v2"/>} />
        <Route path="/blog_posts" element={<BlogPostsPage />} />
        <Route path="/posts/detail" element={<PostDetailPage />} />
        <Route path="/sign_in" element={<SignInPage />} />
        <Route path="/sign_up" element={<SignupPage />} />
        <Route path="/sign_out" element={<SignOutPage />} />
      </Route>
    </Routes>
  );
}
