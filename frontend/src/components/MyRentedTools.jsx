import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyRentedTools, returnTool } from "../services/api";
import { toast } from "react-toastify";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const MyRentedTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRentedTools = async () => {
    try {
      const res = await getMyRentedTools();
      setTools(res.data);
    } catch (err) {
      toast.error("Failed to load rented tools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentedTools();
  }, []);

  const handleReturn = async (toolId) => {
    try {
      await returnTool(toolId);
      toast.success("Tool returned successfully");
      fetchRentedTools();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to return tool");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  if (tools.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">You have not rented any tools.</p>
        <Link to="/tools" className="mt-4 inline-block text-blue-500 hover:underline">
          Browse tools
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold">My Rented Tools</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool._id}
            className="rounded-lg border bg-white p-4 shadow hover:shadow-md"
          >
            <img
              src={
                tool.imageUrl
                  ? `${SERVER_URL}${tool.imageUrl}`
                  : "https://via.placeholder.com/300"
              }
              alt={tool.name}
              className="h-40 w-full rounded object-cover"
            />
            <h3 className="mt-2 font-semibold">{tool.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{tool.description}</p>
            <p className="mt-1 text-blue-600 font-semibold">
              ₹{tool.pricePerDay}/day
            </p>
            <p className="text-sm text-gray-500">Owner: {tool.listedBy?.name}</p>
            <button
              onClick={() => handleReturn(tool._id)}
              className="mt-3 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Return Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRentedTools;
