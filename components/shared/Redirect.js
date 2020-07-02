import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Redirect({ toPage, query }) {
  const router = useRouter();
  useEffect(() => {
    router.push({ pathname: toPage, query });
  }, []);
  return null;
}

export default Redirect;
