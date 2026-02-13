import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const MyTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTools = async () => {
    try {
      const res = await api.get("/api/tools/my-listed");
      setTools(res.data);
    } catch (err) {
      console.error("Error fetching my tools:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">Loading your tools...</p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">My Tools</h2>
      <p className="text-gray-600 mb-6">
        Tools you&apos;ve listed for others to rent. See which are available or
        rented.
      </p>

      {tools.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 mb-4">You haven&apos;t listed any tools yet.</p>
          <Link
            to="/tools/add"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Your First Tool
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <Link to={`/tools/${tool._id}`} className="block">
                <img
                  src={
                    tool.imageUrl
                      ? `${SERVER_URL}${tool.imageUrl}`
                      : "https://via.placeholder.com/300"
                  }
                  alt={tool.name}
                  className="w-full h-40 object-cover"
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {tool.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      tool.available
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {tool.available ? "Available" : "Rented"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {tool.description}
                </p>
                <p className="text-blue-600 font-bold mb-3">
                  ₹{tool.pricePerDay}/day
                </p>

                {!tool.available && tool.rentedBy && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700">
                      Rented by
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {tool.rentedBy.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tool.rentedBy.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Since {formatDate(tool.rentedAt)}
                    </p>
                  </div>
                )}

                <Link
                  to={`/tools/${tool._id}`}
                  className="inline-block mt-3 text-blue-600 text-sm font-medium hover:underline"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTools;
