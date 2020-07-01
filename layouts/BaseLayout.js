import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/shared/Hero';
import Footer from '@/components/shared/Footer';
import { ToastContainer } from 'react-toastify';

const BaseLayout = ({ children, page = '', footer = 'absolute' }) => {
  const isHomePage = () => page === 'Home';
  return (
    <div className="portfolio-app">
      <Navbar />
      {isHomePage() && <Hero />}
      <div>{children}</div>
      <div className="text-center h4">
        <Footer footer={footer} />
      </div>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </div>
  );
};

export default BaseLayout;
