import React from "react";

const Footer = ({ footer }) => {
  const classPositionFooter =
    footer === "absolute"
      ? "sticky-absolute"
      : footer === "relative"
      ? "sticky-relative"
      : "";
  return (
    <footer className={`py-4 bg-black py-3 ${classPositionFooter}`}>
      <small>Copyright &copy; {new Date().getFullYear()} Live Portfolio</small>
    </footer>
  );
};

export default Footer;
