import React from "react";

const Hero = () => {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">I'm Ilya. Front-End Developer</h1>
          <h2 className="white hero-subtitle">
            Check my portfolio and finished courses
          </h2>
          <div className="button-container">
            <div className="btn-main">
              <a href="" className="btn btn-primary ttu">
                My Work
              </a>
            </div>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <img
                className="hero-image"
                src="https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2019/07/mern-stack-a-to-z-nocdn.jpg?fit=730%2C487&ssl=1"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
