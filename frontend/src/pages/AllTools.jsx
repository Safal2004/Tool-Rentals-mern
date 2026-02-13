import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AllTools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/tools/all`)
      .then((res) => setTools(res.data))
      .catch((err) => console.error("Error fetching tools:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Tools</h2>
      {tools.length === 0 ? (
        <p className="text-center text-gray-500">No tools listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool._id} to={`/tools/${tool._id}`}>
              <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <img
                  src={
                    tool.imageUrl
                      ? `${SERVER_URL}${tool.imageUrl}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={tool.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-2">{tool.name}</h3>
                <p className="text-gray-700 line-clamp-2">{tool.description}</p>
                <p className="font-bold mt-2">₹{tool.pricePerDay}/day</p>
                <span className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTools;
