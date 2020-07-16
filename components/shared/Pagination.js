import React, { useState } from 'react';
import Pagination from 'react-js-pagination';

const AppPagination = ({ count }) => {
  const [activePage, setActivePage] = useState(1);
  return (
    <Pagination
      itemclass="page-item"
      linkClass="page-link"
      activePage={activePage}
      itemsCountPerPage={8}
      totalItemsCount={count || 0}
      pageRangeDisplayed={5}
      onChange={page => setActivePage(page)}
    />
  );
};

export default AppPagination;
