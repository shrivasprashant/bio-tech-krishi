import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const nameRef = useRef('');
  const brandRef = useRef('');
  const categoryRef = useRef('');
  const rating = 4.5;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://api.bhartiyabiotech.com/products');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSearch = () => {
    const filteredProjects = projects.filter((project) => {
      const nameValue = nameRef.current.value.trim().toLowerCase();
      const brandValue = brandRef.current.value.trim().toLowerCase();
      const categoryValue = categoryRef.current.value.trim().toLowerCase();

      return (
        (nameValue === '' || project.productName.toLowerCase().includes(nameValue)) &&
        (brandValue === '' || project.brand.toLowerCase().includes(brandValue)) &&
        (categoryValue === 'select category' || project.category.toLowerCase() === categoryValue)
      );
    });

    setProjects(filteredProjects);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.bhartiyabiotech.com/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success("Product Deleted Successfully");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mt-4 mb-4">
        <h3 className="text-2xl font-bold p-8">Product Dashboard</h3>
        <h4 className="text-md font-semibold pr-5">Total Products: {projects.length}</h4>
      </div>

      <div className="flex items-center justify-around p-3 mt-4 mb-4">
        <input
          type="text"
          className="border border-gray-600 rounded-md px-4 py-2 w-64"
          placeholder="Product Name"
          ref={nameRef}
        />
        <input
          type="text"
          className="border border-gray-600 rounded-md px-4 py-2 w-64"
          placeholder="Brand Name"
          ref={brandRef}
        />
        <select className="border border-gray-600 rounded-md py-2 w-64" ref={categoryRef}>
          <option>Select Category</option>
          {projects.map((project, index) => (
            <option key={index}>{project.category}</option>
          ))}
        </select>
        <button className="px-3 py-2 w-32 rounded-md text-md text-white font-semibold bg-green-500" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="grid mx-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {projects.map((project, index) => (
          <div key={index} className="rounded-lg overflow-hidden bg-white shadow-lg mb-3 hover:shadow-2xl hover:scale-105 transition duration-300">
            <div className="p-3">
              <img src={project.imageUrl} alt="product image" className="w-full h-48 object-cover" />
              <h3 className="text-xl font-bold mt-4 mb-2">{project.productName}</h3>
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Brand:</span> {project.brand}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">Category:</span> {project.category}
              </div>
              <div className="text-sm p-2 h-28 overflow-x-hidden overflow-y-auto webkit-scrollbar-hidden  ">
                <p className="text-sm text-gray-700 mb-4"> {project.description}</p>
              </div>
              {project.varients && project.varients.length > 0 && (
                <div className="flex items-center mb-2">
                  <div className="font-semibold text-lg text-black">Price: ₹{project.varients[0].price}</div>
                </div>
              )}
              <div className="flex items-center mb-2">
                <div className="font-semibold">Rating:</div>
                <div className="text-sm ml-1">{rating}</div>
              </div>
              <div className="flex items-center mb-4">
                <div className="font-semibold">Stock:</div>
                <div className="text-sm ml-1">{project.stock}</div>
              </div>
              <div className="flex items-center space-x-5 mb-2">
                <Link to={`/UpdateProduct/${project.productId}`} state={{ project }} className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(project.productId)} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
