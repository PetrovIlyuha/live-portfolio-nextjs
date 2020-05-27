import React from "react";

const PortfolioDetail = ({ query }) => {
  const { id } = query;
  return (
    <div>
      <div className="container">Detail Page Portfolio ID: {id}</div>
    </div>
  );
};

PortfolioDetail.getInitialProps = ({ query }) => {
  return { query };
};

export default PortfolioDetail;
