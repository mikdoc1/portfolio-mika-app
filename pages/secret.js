import Layout from '../components/Layout/Layout';
import BasePage from '../components/BasePage';
import withAuth from '../hoc/withAuth';

const Secret = ({ user, loading }) => {
  return (
    <Layout user={user} loading={loading}>
      <BasePage>
        <h1>I am Secret Page</h1>
      </BasePage>
    </Layout>
  );
};

export default withAuth(Secret)();
