import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Srikar Ambula</p>
    </footer>
  );
};

export default Footer;
