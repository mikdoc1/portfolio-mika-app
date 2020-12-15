import Redirect from '../components/Shared/Redirect';
import { useGetUser } from '../actions/user';
import { isAuthorized } from '../utils/auth0';

const withAuth = (Component) => (role) => {
  return (props) => {
    const { user, loading } = useGetUser();
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return <Redirect ssr to="/api/v1/login" />;
    } else {
      if (role && !isAuthorized(user, role)) {
        return <Redirect ssr to="/api/v1/login" />;
      }
      return <Component user={user} loading={loading} {...props} />;
    }
  };
};

export default withAuth;
