import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { fetchUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("user", user);
    setLoginUser(user);
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
