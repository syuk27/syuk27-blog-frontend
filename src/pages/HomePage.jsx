import React from "react";
import Button from "../layout/Button";
import { Link, useNavigate } from "react-router-dom";
import { getUserPost } from "../api/userpost/userpost";
import "react-quill/dist/quill.snow.css";

const Home = () => {
  const navigate = useNavigate();

  const HandleNewPost = () => {
    navigate("/admin_editor");
  }

  const userPost = getUserPost(1);
  console.log("userPost", userPost);

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Easy Ledger - Sample</h2>
      <Button clickFnc={HandleNewPost}>New Post</Button>
      
    </div>
  );
};

export default Home;
