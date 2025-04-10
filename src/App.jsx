import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import useLoginUser from "./hooks/user/useLoginUser";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { fetchUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useLoginUser();
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setLoginUser(user);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar user={loginUser} />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
