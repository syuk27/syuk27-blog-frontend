import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { resetUser } from "../../store/userSlice";

const SignOutPage = () => {
  const dispatch = useDispatch();
  const naviage = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(resetUser());
    naviage("/");
  }, [dispatch]);

  return <></>;
};

export default SignOutPage;
