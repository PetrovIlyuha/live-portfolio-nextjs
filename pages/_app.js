import React from "react";
import "@/styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Footer from "../components/shared/Footer";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});
const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === "Home";
  return (
    <ApolloProvider client={client}>
      <div className="portfolio-app">
        <Navbar />
        {isHomePage() && <Hero />}
        <div className="container">
          <Component {...pageProps} />
        </div>
        <div className="text-center h4">{isHomePage() && <Footer />}</div>
      </div>
    </ApolloProvider>
  );
};

export default MyApp;
