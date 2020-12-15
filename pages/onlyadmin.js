import Layout from '../components/Layout/Layout';
import BasePage from '../components/BasePage';
import withAuth from '../hoc/withAuth';

const OnlyAdmin = ({ user, loading }) => {
  return (
    <Layout user={user} loading={loading}>
      <BasePage>
        <h1>I am Admin Page - Hello {user.name}</h1>
      </BasePage>
    </Layout>
  );
};

export default withAuth(OnlyAdmin)('admin');
