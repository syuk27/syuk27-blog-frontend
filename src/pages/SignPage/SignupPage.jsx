import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../layout/Button";
import Validation from "../../layout/Validation";
import { registerUser, resetUser } from "../../store/userSlice";
import { emailRegex, passwordRegex } from "../../utils/validation";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { loading, status, error } = useSelector((state) => state.user);
  const naviage = useNavigate();

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    console.log("loading", loading);
    console.log("status", status);

    if (status === 200) {
      alert("등록 되었습니다.");
      naviage("/");
      dispatch(resetUser());
    }

    if (status !== 200 && error) {
      if (error.message) {
        alert(error.message);
      }

      if (!error.message) {
        alert("잘못된 요청입니다.");
      }

      console.log("error", error);
    }
  }, [loading, status, error]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold">
            ✅Nickname:
          </label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

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
          <Validation value={formData.email} patten={emailRegex}>
            Invalid email format
          </Validation>
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
          <Validation value={formData.password} patten={passwordRegex}>
            Invalid password format
          </Validation>
        </div>
        <div className="text-right">
          <Button type="submit">Create account</Button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
