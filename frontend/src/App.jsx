import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar";
import MyRentedTools from "./components/MyRentedTools";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import MyTools from "./pages/MyTools";
import AddTool from "./pages/AddTool";
import ToolDetails from "./pages/ToolDetails";

import useAuthStore from "./stores/useAuthStore";

function App() {
  const { userData } = useAuthStore();

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={userData ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={userData ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/profile"
          element={userData ? <MyProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-rented-tools"
          element={userData ? <MyRentedTools /> : <Navigate to="/login" />}
        />

        <Route
          path="/tools"
          element={userData ? <MyTools /> : <Navigate to="/login" />}
        />
        <Route path="/tools/:toolId" element={<ToolDetails />} />
        <Route
          path="/tools/add"
          element={userData ? <AddTool /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={
            <div className="text-center text-xl mt-10 text-gray-600">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
