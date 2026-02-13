import React, { useState } from "react";
import api from "../services/api";

const AddTool = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pricePerDay: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category || !formData.pricePerDay) {
      alert("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("pricePerDay", formData.pricePerDay);
    if (image) data.append("image", image);

    try {
      await api.post("/api/tools/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Tool added successfully!");
      setFormData({ name: "", description: "", category: "", pricePerDay: "" });
      setImage(null);
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to add tool. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add a New Tool
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Tool Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Electric, Gardening)"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price per Day (₹)"
          value={formData.pricePerDay}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded-md p-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Tool
        </button>
      </form>
    </div>
  );
};

export default AddTool;
