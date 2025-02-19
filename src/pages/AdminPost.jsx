import { useState } from "react";
import Button from "../layout/Button";
import axios from "axios";

export default function AdminPost() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handlelFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("파일을 선택하세요.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        axios.post("")
    } catch (error) {
        
    }

  };

  return (
    <div>
      <input
        type="file"
        onChange={handlelFileChange}
        className="from-control mb-2"
      />
      <Button clickFnc={handleUpload}>업로드</Button>
      {selectedFile && <p>선택된 파일: {selectedFile.name}</p>}
    </div>
  );
}
