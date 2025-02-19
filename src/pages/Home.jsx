import React from "react";
import Button from "../layout/Button";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const HandleNewPost = () => {
    navigate("/admin_post");
  }

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Easy Ledger - Sample</h2>
      <Button clickFnc={HandleNewPost}>New Post</Button>
      
    </div>
  );
};

export default Home;
