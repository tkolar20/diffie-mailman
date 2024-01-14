import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    // Delete the 'email' cookie
    Cookies.remove("attributes");

    // Redirect the user to the '/auth' screen
    window.location.href = "/auth";
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
