import { useEffect } from "react";
import { useRouter } from "next/router";

function Redirect({ toPage }) {
  const router = useRouter();
  useEffect(() => {
    router.push(toPage);
  }, []);
  return null;
}

export default Redirect;
