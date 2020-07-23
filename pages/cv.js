import React from 'react';
import BaseLayout from '../layouts/BaseLayout';

const CV = () => {
  return (
    <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 mt-5">
            <iframe
              style={{ width: '100%', height: '800px' }}
              src="/CV_3.pdf"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default CV;
