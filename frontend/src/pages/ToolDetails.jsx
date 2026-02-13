import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ToolDetails = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/tools/${toolId}`);
        setTool(res.data);
      } catch (err) {
        console.error("Error fetching tool:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [toolId]);

  const handleRent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to rent a tool!");
      return;
    }

    try {
      await axios.post(
        `${SERVER_URL}/api/tools/rent/${toolId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Tool rented for 1 day!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!tool) return <p className="text-center mt-10">Tool not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
      <img
        src={
          tool.imageUrl
            ? `${SERVER_URL}${tool.imageUrl}`
            : "https://via.placeholder.com/400"
        }
        alt={tool.name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{tool.name}</h2>
      <p className="text-gray-600 mb-2">Category: {tool.category}</p>
      <p className="text-gray-700 mb-4">{tool.description}</p>
      <p className="text-lg text-blue-600 font-semibold mb-4">
        ₹{tool.pricePerDay}/day
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Listed by: {tool.listedBy?.name}
      </p>
      <button
        disabled={!tool.available}
        onClick={handleRent}
        className={`mt-4 px-6 py-2 rounded-lg ${
          tool.available
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {tool.available ? "Rent Now" : "Already Rented"}
      </button>
    </div>
  );
};

export default ToolDetails;
