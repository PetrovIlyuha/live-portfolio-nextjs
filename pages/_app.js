import React from "react";
import "@/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import App from "next/app";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="portfolio-app">
      <Navbar />
      {pageProps.appData}
      {Component.name === "Home" && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

// MyApp.getInitialProps = async (context) => {
//   console.log("GET init props _APP");
//   const initialProps =
//     App.getInitialProps && (await App.getInitialProps(context));
//   console.log("init props", initialProps);
//   return {
//     pageProps: { appData: "Hello _app Component", ...initialProps.pageProps },
//   };
// };
export default MyApp;
