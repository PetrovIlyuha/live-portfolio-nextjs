import React from "react";
import "@/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "../components/shared/Footer";

const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === "Home";
  return (
    <div className="portfolio-app">
      <Navbar />
      {isHomePage() && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      <div className="text-center h4">{isHomePage() && <Footer />}</div>
    </div>
  );
};

export default MyApp;
