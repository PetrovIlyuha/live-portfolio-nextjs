import { useGetUser } from "../apollo/actions";
import Redirect from "../components/shared/Redirect";

export default (WrappedComponent, role) => (props) => {
  const { data: { user } = {}, loading, error } = useGetUser({
    fetchPolicy: "network-only",
  });
  if (!loading && (!user || error) && typeof window !== undefined) {
    return <Redirect toPage="/login" />;
  }
  if (user) {
    if (role && user.role !== role) {
      return <Redirect toPage="/login" />;
    }
    return <WrappedComponent {...props} />;
  }
  return <p>Authentication in process"</p>;
};