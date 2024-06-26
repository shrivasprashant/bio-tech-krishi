import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for toast notifications

const SliderImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState("");
  const fileInputRef = useRef(null);
  const authToken = useSelector((state) => state.auth.token);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.bhartiyabiotech.com/upload?image=",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSlider(response.data.url);
      console.log("File uploaded successfully:", response.data);

      toast.success("Slider image uploaded successfully..!");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {selectedFile && (
        <div>
          <h3>Selected File:</h3>
          <p>{selectedFile.name}</p>
        </div>
      )}
      {slider && (
        <div style={{ width: "300px", height: "300px", marginTop: "20px" }}>
          <img
            src={slider}
            alt="Slider"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SliderImage;
