import { useState } from "react";
import Button from "../../layout/Button";
import { passwordRegex, emailPattern } from "../../utils/validation";
import Validation from "../../layout/Validation";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {};

  const errors = {};

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold">
            Nickname:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
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
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          <Validation value={formData.email} patten={emailPattern}>
            Invalid email format
          </Validation>
        </div>

        <div className="mb-4">
          <label htmlFor="pwd" className="block text-gray-700 font-bold">
            Password:
          </label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={formData.pwd}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          <Validation value={formData.pwd} patten={passwordRegex}>
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
