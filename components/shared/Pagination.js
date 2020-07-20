import React from 'react';
import Pagination from 'react-js-pagination';

const AppPagination = ({ count, pageSize, pageNum, onPageChange }) => {
  return (
    <Pagination
      itemclass="page-item"
      linkClass="page-link"
      activePage={pageNum}
      itemsCountPerPage={pageSize}
      totalItemsCount={count || 0}
      pageRangeDisplayed={5}
      onChange={page => {
        onPageChange(page, pageSize);
      }}
    />
  );
};

export default AppPagination;
