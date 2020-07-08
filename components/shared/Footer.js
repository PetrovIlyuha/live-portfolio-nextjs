import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        padding: '20px 0',
        bottom: 0,
        background: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)',
        width: '100vw',
        color: 'white',
      }}
    >
      <small>Copyright &copy; {new Date().getFullYear()} Live Portfolio</small>
    </footer>
  );
};

export default Footer;
