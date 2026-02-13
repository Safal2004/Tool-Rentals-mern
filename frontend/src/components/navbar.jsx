import { AppBar, Menu, MenuItem, Toolbar } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";
import {
  Home,
  LogIn,
  Menu as MenuIcon,
  User,
  UserPlus,
  LogOut,
  Wrench,
  Package,
  Layers,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import useLogout from "../hooks/auth/useLogout";
import useAuthStore from "../stores/useAuthStore";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <Button
      onClick={logout}
      disabled={loading}
      sx={{
        backgroundColor: "#EF3f1f",
        "&:hover": { backgroundColor: "#DC2626" },
        padding: "8px 16px",
        textTransform: "none",
      }}
      className={`flex items-center gap-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {loading ? (
        <CircularProgress size={20} className="text-white" />
      ) : (
        <LogOut size={20} />
      )}
      <span className="font-medium text-white">
        {loading ? "Logging out..." : "Logout"}
      </span>
    </Button>
  );
};

const NavLink = ({ to, children, icon: Icon }) => (
  <Link
    to={to}
    className="flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-all duration-200 hover:bg-white/10"
  >
    {Icon && <Icon size={18} />}
    <span>{children}</span>
  </Link>
);

const MobileMenuItem = ({ to, children, icon: Icon, onClick }) => (
  <MenuItem onClick={onClick} className="w-full">
    <Link to={to} className="flex w-full items-center gap-2 px-2 py-1 text-gray-700">
      {Icon && <Icon size={18} />}
      <span>{children}</span>
    </Link>
  </MenuItem>
);

const Navbar = () => {
  const { userData } = useAuthStore();
  const isAuthenticated = userData !== null;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const getMenuItems = () => {
    const items = [
      <MobileMenuItem key="home" to="/" icon={Home} onClick={handleMenuClose}>
        Home
      </MobileMenuItem>,
    ];

    if (isAuthenticated) {
      items.push(
        <MobileMenuItem
          key="my-tools"
          to="/tools"
          icon={Layers}
          onClick={handleMenuClose}
        >
          My Tools
        </MobileMenuItem>
      );
items.push(
      <MobileMenuItem
        key="my-rented"
        to="/my-rented-tools"
        icon={Package}
        onClick={handleMenuClose}
      >
        My Rented Tools
      </MobileMenuItem>
      );
items.push(
  <MobileMenuItem
    key="add"
    to="/tools/add"
    icon={Wrench}
    onClick={handleMenuClose}
  >
    Add Tool
  </MobileMenuItem>
);
items.push(
  <MobileMenuItem key="profile" to="/profile" icon={User} onClick={handleMenuClose}>
    Profile
  </MobileMenuItem>
);
items.push(
  <MenuItem key="logout" onClick={handleMenuClose} className="w-full px-4">
    <LogoutButton />
  </MenuItem>
);
    } else {
  items.push(
    <MobileMenuItem key="login" to="/login" icon={LogIn} onClick={handleMenuClose}>
      Login
    </MobileMenuItem>
  );
  items.push(
    <MobileMenuItem key="register" to="/register" icon={UserPlus} onClick={handleMenuClose}>
      Register
    </MobileMenuItem>
  );
}

return items;
  };

return (
  <AppBar position="sticky" className="bg-blue-500 shadow-lg">
    <Toolbar className="container mx-auto px-4">
      <div className="flex w-full items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white hover:opacity-90"
        >
          <Wrench size={24} />
          Tool Rental
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" icon={Home}>Home</NavLink>
          {isAuthenticated && (
            <NavLink to="/tools" icon={Layers}>My Tools</NavLink>
          )}
          {isAuthenticated ? (
            <>
              <NavLink to="/my-rented-tools" icon={Package}>My Rented</NavLink>
              <NavLink to="/tools/add" icon={Wrench}>Add Tool</NavLink>
              <NavLink to="/profile" icon={User}>Profile</NavLink>
              <LogoutButton />
            </>
          ) : (
            <>
              <NavLink to="/login" icon={LogIn}>Login</NavLink>
              <NavLink to="/register" icon={UserPlus}>Register</NavLink>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={handleMenuClick}
            className="rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="menu"
          >
            <MenuIcon size={24} />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="mt-2"
            PaperProps={{ className: "w-56 py-2 rounded-lg shadow-lg" }}
          >
            {getMenuItems()}
          </Menu>
        </div>
      </div>
    </Toolbar>
  </AppBar>
);
};

export default Navbar;
