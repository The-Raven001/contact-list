import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-black bg-body mb-3 d-flex justify-content-end">
      <div className="ml-auto">
        <Link to="/demo">
          <button className="btn btn-primary me-3">Add a contact</button>
        </Link>
      </div>
    </nav>
  );
};
