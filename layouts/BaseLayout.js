import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/shared/Hero';
import Footer from '../components/shared/Footer';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { messages } from '../variables/messages';

const BaseLayout = ({ children, page = '' }) => {
  const router = useRouter();
  const { message } = router.query;

  const displayMessage = () => {
    if (message === 'LOGGED_IN') {
      toast.success(messages[message], {
        hideProgressBar: true,
        autoClose: 5000,
        pauseOnHover: true,
      });
    } else if (message === 'LOGGED_OUT') {
      toast.success(messages[message], {
        hideProgressBar: true,
        autoClose: 5000,
        pauseOnHover: true,
      });
    } else {
      toast.error(messages[message], {
        hideProgressBar: true,
        autoClose: 5000,
        pauseOnHover: true,
      });
    }
  };
  const isHomePage = () => page === 'Home';
  return (
    <div className="portfolio-app">
      <Navbar />
      {message && displayMessage()}
      {isHomePage() && <Hero />}
      <div style={{ marginTop: '100px' }}>{children}</div>
      <div className="text-center h4">
        <Footer />
      </div>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </div>
  );
};

export default BaseLayout;
