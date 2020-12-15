import Layout from '../components/Layout/Layout';
import BasePage from '../components/BasePage';
import { withAuth } from '../utils/auth0';

const SecretSsr = ({ user, title }) => {
  return (
    <Layout user={user} loading={false}>
      <BasePage>
        <h1>I am Secret Page</h1>
        <h2>{title}</h2>
      </BasePage>
    </Layout>
  );
};

const getTitle = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ title: 'My new title!' });
    }, 500);
  });
};

export const getServerSideProps = withAuth(async ({ req, res }, user) => {
  const title = await getTitle();
  return title;
})();

export default SecretSsr;
