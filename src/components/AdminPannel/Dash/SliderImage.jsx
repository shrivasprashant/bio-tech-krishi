import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { FiUploadCloud, FiTrash } from "react-icons/fi"; // Import FiTrash for delete icon

const SliderImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState("");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const authToken = useSelector((state) => state.auth.token);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images from the API
  const fetchImages = async () => {
    try {
      const response = await axios.get("https://api.bhartiyabiotech.com/images", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setImages(response.data); // Assuming the API returns an array of image objects
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

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
      fetchImages(); // Refresh images after successful upload

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`https://api.bhartiyabiotech.com/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      fetchImages(); // Refresh images after deletion
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload an Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <label
            htmlFor="file-upload"
            className={classNames(
              "px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer",
              {
                "opacity-50 cursor-not-allowed": loading,
              }
            )}
          >
            <span className="flex items-center">
              <FiUploadCloud className="mr-2" />
              {loading ? "Uploading..." : "Upload"}
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
              accept="image/*"
            />
          </label>
        </div>
        {selectedFile && (
          <div>
            <h3 className="text-lg font-semibold mt-4">Selected File:</h3>
            <p>{selectedFile.name}</p>
          </div>
        )}
        <button
          type="submit"
          className={classNames(
            "px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer",
            {
              "opacity-50 cursor-not-allowed": loading,
            }
          )}
          disabled={!selectedFile || loading}
        >
          Submit
        </button>
      </form>
      {slider && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Uploaded Image:</h3>
          <div className="w-64 h-64 overflow-hidden rounded-lg border">
            <img
              src={slider}
              alt="Slider"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Available Images:</h3>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <FiTrash />
              </button>
              <div className="w-full h-48 overflow-hidden rounded-lg border">
                <img
                  src={image.url} // Assuming your API returns an array of objects with a 'url' property
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderImage;
