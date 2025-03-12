import { useEffect, useState } from "react";
import Button from "../../layout/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetAuth } from "../../store/authSlice";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { loading, status, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  const naviage = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated, status)
    if (isAuthenticated && status === 200) {
      alert("로그인 되었습니다.");
      naviage("/");
      dispatch(resetAuth());
    }

    if (!isAuthenticated && error) {
      if (error.message) {
        alert(error.message);
      }

      if (!error.message) {
        alert("잘못된 요청입니다.");
      }

      console.log("error2", error);
      dispatch(resetAuth());
    }
  }, [loading, status, isAuthenticated, error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold">
          Email address:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="pwd" className="block text-gray-700 font-bold">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="text-right">
        <Button type="submit">Sign in</Button>
      </div>
    </form>
  );
};

export default SignInPage;
