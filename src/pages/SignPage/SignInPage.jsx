import { useState } from "react";
import Button from "../../layout/Button";

const SignInPage = () => {
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
    console.log("Login Submitted", formData);
  };

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
