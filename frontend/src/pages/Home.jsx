import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Home = () => {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/tools/all`);
        setTools(res.data);
      } catch (err) {
        console.error("Error fetching tools:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const handleRent = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to rent a tool!");
      return;
    }

    try {
      await axios.post(
        `${SERVER_URL}/api/tools/rent/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Tool rented! Available again after 1 day.");
      setTools((prev) =>
        prev.map((tool) =>
          tool._id === id ? { ...tool, available: false } : tool
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  const filteredTools = tools.filter((tool) =>
    (tool?.name || "").toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">
          Tools 
        </h1>

        <input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link
            to="/tools/add"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Add Tool
          </Link>
        </div>
      </div>

      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div
              key={tool._id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition hover:-translate-y-1"
            >
              {!tool.available && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Rented
                </div>
              )}

              <Link to={`/tools/${tool._id}`} className="block">
                <img
                  src={
                    tool.imageUrl
                      ? `${SERVER_URL}${tool.imageUrl}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={tool.name}
                  className={`w-full h-48 object-cover rounded-t-lg ${
                    !tool.available ? "opacity-60" : ""
                  }`}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {tool.name || "Unnamed Tool"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {tool.description || ""}
                  </p>
                </div>
              </Link>

              <div className="px-4 pb-4 flex justify-between items-center">
                <span className="text-blue-600 font-bold">
                  ₹{tool.pricePerDay ?? 0}/day
                </span>
                <button
                  disabled={!tool.available}
                  onClick={(e) => handleRent(e, tool._id)}
                  className={`text-sm px-3 py-1 rounded transition ${
                    tool.available
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                >
                  {tool.available ? "Rent" : "Rented"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No tools available
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
